import { expect, test, type Page } from "@playwright/test";

const OSM_TILE_PREFIX = "https://tile.openstreetmap.org/";
const SNAPSHOT_URL = "**/api/snapshot";
const FALLBACK_MESSAGE =
  "Не вдалося отримати дані: Сервіс не повернув коректну відповідь";
const COLLECTED_AT = "2026-09-24T12:34:56.789Z";

interface TileRequests {
  urls: string[];
  blocked: number;
  completed: number;
}

function vessel(id: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    name: `Судно ${id}`,
    lat: 51.1,
    lon: 1.2,
    speedKnots: 4.5,
    courseDeg: 90,
    timestamp: "2026-09-24T12:00:00.112Z",
    source: "aisstream",
    ...overrides,
  };
}

function successBody(vessels: ReturnType<typeof vessel>[], truncated = false) {
  return {
    ok: true,
    vessels,
    collectedAt: COLLECTED_AT,
    windowSeconds: 15,
    count: vessels.length,
    truncated,
    reason: truncated ? "limit_reached" : "window_elapsed",
  };
}

function fixedError(code: string, message: string) {
  return {
    ok: false,
    attemptedAt: COLLECTED_AT,
    error: { code, message },
  };
}

async function blockTiles(page: Page): Promise<TileRequests> {
  const stats: TileRequests = { urls: [], blocked: 0, completed: 0 };
  page.on("request", (request) => {
    if (request.url().startsWith(OSM_TILE_PREFIX)) {
      stats.urls.push(request.url());
    }
  });
  page.on("requestfinished", (request) => {
    if (request.url().startsWith(OSM_TILE_PREFIX)) {
      stats.completed += 1;
    }
  });
  await page.route(`${OSM_TILE_PREFIX}**`, async (route) => {
    stats.blocked += 1;
    await route.abort();
  });
  return stats;
}

function expectTilesBlocked(stats: TileRequests) {
  expect(stats.blocked).toBeGreaterThan(0);
  expect(stats.completed).toBe(0);
}

test("starts in demo mode and preserves the B-07 marker/card interaction", async ({ page }) => {
  const tiles = await blockTiles(page);
  await page.goto("/");

  await expect(page.locator('[data-source="demo"]')).toHaveText("Демонстраційні дані");
  const markers = page.locator("[data-vessel-id]");
  await expect(markers).toHaveCount(3);
  const ids = await markers.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-vessel-id")).sort(),
  );
  expect(ids).toEqual(["demo-1", "demo-2", "demo-3"]);

  await page.locator('[data-vessel-id="demo-1"]').click();
  await expect(page.locator('[data-vessel-card-id="demo-1"]')).toBeVisible();
  await page.locator('[data-vessel-id="demo-1"]').click();
  await expect(page.locator('[data-vessel-card-id="demo-1"]')).toBeVisible();

  expectTilesBlocked(tiles);
});

test("locks loading, retains the map, and allows a later user request", async ({ page }) => {
  const tiles = await blockTiles(page);
  let requestCount = 0;
  await page.route(SNAPSHOT_URL, async (route) => {
    requestCount += 1;
    await new Promise((resolve) => setTimeout(resolve, requestCount === 1 ? 700 : 0));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(
        successBody(requestCount === 1 ? [vessel("123456789")] : []),
      ),
    });
  });

  await page.goto("/");
  await expect(page.locator("[data-vessel-id]")).toHaveCount(3);
  const button = page.getByRole("button", { name: "Завантажити справжні позиції" });
  const mapElement = await page.locator(".sea-map").elementHandle();
  expect(mapElement).not.toBeNull();

  await button.click();
  await expect(button).toBeDisabled();
  await expect(page.locator('[data-source="loading"]')).toHaveText("Завантаження…");
  await expect(page.locator("[data-vessel-id]")).toHaveCount(0);
  await expect(page.locator("[data-vessel-card-id]")).toHaveCount(0);
  expect(await mapElement!.evaluate((element) => element.isConnected)).toBe(true);
  await button.evaluate((element: HTMLButtonElement) => element.click());
  expect(requestCount).toBe(1);

  await expect(button).toBeEnabled();
  await button.click();
  await expect(page.locator('[data-source="aisstream"]')).toContainText("суден: 0");
  expect(requestCount).toBe(2);
  expectTilesBlocked(tiles);
});

test("renders stationary snapshot markers, matching cards, and exact status", async ({ page }) => {
  const tiles = await blockTiles(page);
  await page.route(SNAPSHOT_URL, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(successBody([vessel("123456789"), vessel("987654321")])),
    }),
  );

  await page.goto("/");
  await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
  const status = page.locator('[data-source="aisstream"]');
  await expect(status).toHaveText(
    "AISStream · знімок за 15 с · отримано 12:34:56 UTC · суден: 2 · вибірка неповна",
  );
  await expect(page.locator("[data-vessel-id]")).toHaveCount(2);
  await expect(page.locator('[data-vessel-id="123456789"]')).toBeVisible();
  await expect(page.locator('[data-vessel-id="987654321"]')).toBeVisible();

  await page.locator('[data-vessel-id="987654321"]').click();
  await expect(page.locator('[data-vessel-card-id="987654321"]')).toBeVisible();
  await expect(page.locator('[data-vessel-card-id="987654321"]')).toContainText("987654321");

  const marker = page.locator('[data-vessel-id="123456789"]');
  const initialTransform = await marker.evaluate((element) => (element as HTMLElement).style.transform);
  await page.waitForTimeout(2200);
  const laterTransform = await marker.evaluate((element) => (element as HTMLElement).style.transform);
  expect(laterTransform).toBe(initialTransform);
  expectTilesBlocked(tiles);
});

test("shows the truncated status suffix at the vessel limit", async ({ page }) => {
  const vessels = Array.from({ length: 100 }, (_, index) =>
    vessel(String(100000000 + index)),
  );
  await page.route(SNAPSHOT_URL, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(successBody(vessels, true)),
    }),
  );

  await page.goto("/");
  await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
  await expect(page.locator('[data-source="aisstream"]')).toHaveText(
    "AISStream · знімок за 15 с · отримано 12:34:56 UTC · суден: 100 · вибірка неповна · зупинено на ліміті 100",
  );
  await expect(page.locator("[data-vessel-id]")).toHaveCount(100);
});

test("distinguishes an empty successful snapshot from an error", async ({ page }) => {
  await page.route(SNAPSHOT_URL, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(successBody([])),
    }),
  );

  await page.goto("/");
  await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
  await expect(page.locator('[data-source="aisstream"]')).toHaveText(
    "AISStream · знімок за 15 с · отримано 12:34:56 UTC · суден: 0 · вибірка неповна",
  );
  await expect(page.getByRole("status")).toContainText("За час збору позицій не отримано");
  await expect(page.locator("[data-vessel-id]")).toHaveCount(0);
  await expect(page.locator("[data-vessel-card-id]")).toHaveCount(0);
});

const API_ERRORS = [
  ["no_api_key", "Ключ AISStream не налаштовано"],
  ["connect_failed", "Не вдалося підключитися до джерела"],
  ["provider_error", "Джерело повернуло помилку"],
  ["disconnected", "З'єднання з джерелом розірвано"],
  ["internal", "Внутрішня помилка сервера"],
] as const;

for (const [code, message] of API_ERRORS) {
  test(`renders the fixed ${code} API error without stale vessels`, async ({ page }) => {
    await page.route(SNAPSHOT_URL, (route) =>
      route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify(fixedError(code, message)),
      }),
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
    await expect(page.locator('[data-source="none"]')).toHaveText("Даних на карті немає");
    await expect(page.getByRole("status")).toContainText(`Не вдалося отримати дані: ${message}`);
    await expect(page.locator("[data-vessel-id]")).toHaveCount(0);
    await expect(page.locator("[data-vessel-card-id]")).toHaveCount(0);
  });
}

test("clears the previous snapshot when a later request fails", async ({ page }) => {
  let requests = 0;
  await page.route(SNAPSHOT_URL, async (route) => {
    requests += 1;
    if (requests === 1) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(successBody([vessel("123456789")])),
      });
      return;
    }

    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify(fixedError("connect_failed", "Не вдалося підключитися до джерела")),
    });
  });

  await page.goto("/");
  const button = page.getByRole("button", { name: "Завантажити справжні позиції" });
  await button.click();
  await expect(page.locator('[data-vessel-id="123456789"]')).toBeVisible();
  await page.locator('[data-vessel-id="123456789"]').click();
  await expect(page.locator('[data-vessel-card-id="123456789"]')).toBeVisible();

  await button.click();
  await expect(page.locator('[data-source="none"]')).toHaveText("Даних на карті немає");
  await expect(page.getByRole("status")).toHaveText(
    "Не вдалося отримати дані: Не вдалося підключитися до джерела",
  );
  await expect(page.locator("[data-vessel-id]")).toHaveCount(0);
  await expect(page.locator("[data-vessel-card-id]")).toHaveCount(0);
  expect(requests).toBe(2);
});

for (const malformed of [
  { label: "invalid JSON", body: "{not-json" },
  { label: "invalid snapshot shape", body: JSON.stringify({ ok: true, vessels: [{}] }) },
]) {
  test(`uses the approved fallback for ${malformed.label}`, async ({ page }) => {
    await page.route(SNAPSHOT_URL, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: malformed.body,
      }),
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
    await expect(page.locator('[data-source="none"]')).toHaveText("Даних на карті немає");
    await expect(page.getByRole("status")).toHaveText(FALLBACK_MESSAGE);
    await expect(page.locator("[data-vessel-id]")).toHaveCount(0);
  });
}

test("uses the approved fallback after fetch rejection", async ({ page }) => {
  await page.route(SNAPSHOT_URL, (route) => route.abort());
  await page.goto("/");
  await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
  await expect(page.locator('[data-source="none"]')).toHaveText("Даних на карті немає");
  await expect(page.getByRole("status")).toHaveText(FALLBACK_MESSAGE);
  await expect(page.locator("[data-vessel-id]")).toHaveCount(0);
});

test("resets the view on the first non-empty success only and returns to demo on reload", async ({ page }) => {
  const tiles = await blockTiles(page);
  let requests = 0;
  await page.route(SNAPSHOT_URL, async (route) => {
    requests += 1;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(successBody([vessel("123456789")])),
    });
  });
  await page.goto("/");
  const map = page.locator(".sea-map");
  await expect(map).toHaveAttribute("data-map-zoom", "10");

  const zoomIn = page.locator(".leaflet-control-zoom-in");
  await zoomIn.click();
  await expect(map).toHaveAttribute("data-map-zoom", "11");

  const button = page.getByRole("button", { name: "Завантажити справжні позиції" });
  await button.click();
  await expect(page.locator('[data-source="aisstream"]')).toContainText("суден: 1");
  await expect(map).toHaveAttribute("data-map-zoom", "10");
  await expect(map).toHaveAttribute("data-map-center", "51.0000,1.4500");

  await zoomIn.click();
  await expect(map).toHaveAttribute("data-map-zoom", "11");
  await zoomIn.click();
  await expect(map).toHaveAttribute("data-map-zoom", "12");
  await button.click();
  await expect(page.locator('[data-source="aisstream"]')).toContainText("суден: 1");
  await expect(map).toHaveAttribute("data-map-zoom", "12");
  await zoomIn.click();
  await expect(map).toHaveAttribute("data-map-zoom", "13");

  expect(requests).toBe(2);
  await page.reload();
  await expect(page.locator('[data-source="demo"]')).toHaveText("Демонстраційні дані");
  await expect(page.locator("[data-vessel-id]")).toHaveCount(3);
  expectTilesBlocked(tiles);
});
