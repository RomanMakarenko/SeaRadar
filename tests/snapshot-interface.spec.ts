import { expect, test, type Page } from "@playwright/test";

const OSM_TILE_PREFIX = "https://tile.openstreetmap.org/";
const SNAPSHOT_URL = "**/api/snapshot";
const NO_RESPONSE_MESSAGE =
  "Спроба: не вдалося отримати дані: Немає відповіді сервера";
const COLLECTED_AT = "2026-09-24T12:34:56.789Z";
const NEXT_COLLECTED_AT = "2026-09-24T12:35:56.789Z";
const START_TIME = new Date("2026-09-29T12:00:00.000Z");

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

function successBody(
  vessels: ReturnType<typeof vessel>[],
  truncated = false,
  collectedAt = COLLECTED_AT,
) {
  return {
    ok: true,
    vessels,
    collectedAt,
    windowSeconds: 15,
    count: vessels.length,
    truncated,
    reason: truncated ? "limit_reached" : "window_elapsed",
  };
}

function fixedError(
  code: string,
  message: string,
  attemptedAt = COLLECTED_AT,
) {
  return {
    ok: false,
    attemptedAt,
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

test("locks a repeated request while retaining the displayed snapshot", async ({ page }) => {
  const tiles = await blockTiles(page);
  let requestCount = 0;
  let fulfillSecondRequest!: () => void;
  const secondRequestPending = new Promise<void>((resolve) => {
    fulfillSecondRequest = resolve;
  });
  await page.route(SNAPSHOT_URL, async (route) => {
    requestCount += 1;
    if (requestCount === 2) {
      await secondRequestPending;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(
        successBody([vessel(requestCount === 1 ? "123456789" : "987654321")]),
      ),
    });
  });

  await page.goto("/");
  const button = page.getByRole("button", { name: "Завантажити справжні позиції" });
  await button.click();
  const displayedMarker = page.locator('[data-vessel-id="123456789"]');
  await expect(displayedMarker).toBeVisible();
  const source = page.locator('[data-source="aisstream"]');
  await expect(source).toContainText("суден: 1");
  const sourceText = await source.textContent();

  await button.click();
  await expect(button).toBeDisabled();
  await expect(page.locator('[role="status"]')).toHaveText("Завантаження…");
  await expect(displayedMarker).toBeVisible();
  await expect(source).toHaveText(sourceText!);
  await button.evaluate((element: HTMLButtonElement) => element.click());
  expect(requestCount).toBe(2);

  fulfillSecondRequest();
  await expect(button).toBeEnabled();
  await expect(page.locator('[data-vessel-id="987654321"]')).toBeVisible();
  await expect(displayedMarker).toHaveCount(0);
  expect(requestCount).toBe(2);
  expectTilesBlocked(tiles);
});

test("retains a selected demo card while loading and clears it after replacement", async ({ page }) => {
  const tiles = await blockTiles(page);
  let requestCount = 0;
  let fulfillSnapshot!: () => void;
  const snapshotPending = new Promise<void>((resolve) => {
    fulfillSnapshot = resolve;
  });
  await page.route(SNAPSHOT_URL, async (route) => {
    requestCount += 1;
    await snapshotPending;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(
        successBody([
          vessel("123456789"),
          vessel("987654321"),
          vessel("246801357"),
        ]),
      ),
    });
  });

  await page.goto("/");
  await page.locator('[data-vessel-id="demo-1"]').click();
  await expect(page.locator('[data-vessel-card-id="demo-1"]')).toBeVisible();

  const button = page.getByRole("button", { name: "Завантажити справжні позиції" });
  const mapElement = await page.locator(".sea-map").elementHandle();
  expect(mapElement).not.toBeNull();
  await button.click();

  await expect(button).toBeDisabled();
  await expect(page.getByRole("status")).toHaveText("Завантаження…");
  await expect(page.locator('[data-source="demo"]')).toHaveText("Демонстраційні дані");
  await expect(page.locator("[data-vessel-id]")).toHaveCount(3);
  await expect(page.locator('[data-vessel-card-id="demo-1"]')).toBeVisible();
  expect(await mapElement!.evaluate((element) => element.isConnected)).toBe(true);
  await button.evaluate((element: HTMLButtonElement) => element.click());
  expect(requestCount).toBe(1);

  fulfillSnapshot();
  await expect(button).toBeEnabled();
  await expect(page.locator('[data-source="aisstream"]')).toContainText("суден: 3");
  await expect(page.locator('[data-vessel-id^="demo-"]')).toHaveCount(0);
  await expect(page.locator('[data-vessel-id][data-selected="true"]')).toHaveCount(0);
  await expect(page.locator("[data-vessel-card-id]")).toHaveCount(0);
  expect(requestCount).toBe(1);
  expectTilesBlocked(tiles);
});

test("renders snapshot markers and keeps them stationary with exact status", async ({ page }) => {
  await page.clock.install({ time: START_TIME });
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
  await expect(page.getByRole("status")).toHaveText(
    "Спроба 12:34:56 UTC: отримано суден: 2",
  );
  await expect(page.locator("[data-vessel-id]")).toHaveCount(5);
  await expect(page.locator('[data-vessel-source="aisstream"]')).toHaveCount(2);
  await expect(page.locator('[data-vessel-source="demo"]')).toHaveCount(3);
  await expect(page.locator('[data-vessel-id="123456789"]')).toBeVisible();
  await expect(page.locator('[data-vessel-id="987654321"]')).toBeVisible();

  const aisColor = await page
    .locator('[data-vessel-source="aisstream"] .vessel-glyph')
    .first()
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  const demoColor = await page
    .locator('[data-vessel-source="demo"] .vessel-glyph')
    .first()
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(aisColor).not.toBe(demoColor);

  const aisMarker = page.locator('[data-vessel-id="987654321"]');
  const demoMarker = page.locator('[data-vessel-id="demo-1"]');
  const aisMarkerNode = await aisMarker.evaluateHandle((element) => element);
  const demoMarkerNode = await demoMarker.evaluateHandle((element) => element);

  await aisMarker.click();
  await expect(page.locator('[data-vessel-card-id="987654321"]')).toBeVisible();
  await expect(aisMarker).toHaveAttribute("data-selected", "true");
  await expect(page.locator('[data-vessel-id][data-selected="true"]')).toHaveCount(1);
  expect(await aisMarkerNode.evaluate((element) => element.isConnected)).toBe(true);
  expect(await demoMarkerNode.evaluate((element) => element.isConnected)).toBe(true);

  await demoMarker.click();
  await expect(page.locator('[data-vessel-card-id="demo-1"]')).toBeVisible();
  await expect(demoMarker).toHaveAttribute("data-selected", "true");
  await expect(aisMarker).toHaveAttribute("data-selected", "false");
  await expect(page.locator('[data-vessel-id][data-selected="true"]')).toHaveCount(1);
  expect(await aisMarkerNode.evaluate((element) => element.isConnected)).toBe(true);
  expect(await demoMarkerNode.evaluate((element) => element.isConnected)).toBe(true);

  const marker = page.locator('[data-vessel-id="123456789"]');
  const initialTransform = await marker.evaluate((element) => (element as HTMLElement).style.transform);
  await page.clock.runFor(2_000);
  const laterTransform = await marker.evaluate((element) => (element as HTMLElement).style.transform);
  expect(laterTransform).toBe(initialTransform);
  expectTilesBlocked(tiles);
});

test("replaces the demo set and stops demo movement after success", async ({ page }) => {
  await page.clock.install({ time: START_TIME });
  const tiles = await blockTiles(page);
  await page.route(SNAPSHOT_URL, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(successBody([vessel("123456789")])),
    }),
  );

  await page.goto("/");
  const demoMarker = page.locator('[data-vessel-id="demo-1"]');
  const beforeMovement = await demoMarker.evaluate(
    (element) => (element as HTMLElement).style.transform,
  );
  await page.clock.runFor(2_000);
  const afterMovement = await demoMarker.evaluate(
    (element) => (element as HTMLElement).style.transform,
  );
  expect(afterMovement).not.toBe(beforeMovement);

  await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
  await expect(page.locator('[data-vessel-id="123456789"]')).toBeVisible();
  await expect(demoMarker).toBeVisible();
  const frozenTransform = await demoMarker.evaluate(
    (element) => (element as HTMLElement).style.transform,
  );
  await page.clock.runFor(2_000);
  expect(
    await demoMarker.evaluate((element) => (element as HTMLElement).style.transform),
  ).toBe(frozenTransform);
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

test("retains the displayed snapshot after an empty collection attempt", async ({ page }) => {
  let requests = 0;
  await page.route(SNAPSHOT_URL, (route) => {
    requests += 1;
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(
        requests === 1
          ? successBody([vessel("123456789")])
          : successBody([], false, NEXT_COLLECTED_AT),
      ),
    });
  });

  await page.goto("/");
  const button = page.getByRole("button", { name: "Завантажити справжні позиції" });
  await button.click();
  const source = page.locator('[data-source="aisstream"]');
  await expect(source).toHaveText(
    "AISStream · знімок за 15 с · отримано 12:34:56 UTC · суден: 1 · вибірка неповна",
  );
  await expect(page.locator('[data-vessel-id="123456789"]')).toBeVisible();

  await button.click();
  await expect(source).toHaveText(
    "AISStream · знімок за 15 с · отримано 12:34:56 UTC · суден: 1 · вибірка неповна",
  );
  await expect(page.getByRole("status")).toHaveText(
    "Спроба 12:35:56 UTC: за час збору позицій не отримано",
  );
  await expect(page.locator('[data-vessel-id="123456789"]')).toBeVisible();
  expect(requests).toBe(2);
});

test("adds all demo vessels only when a successful snapshot contains fewer than three AIS vessels", async ({ page }) => {
  const tiles = await blockTiles(page);
  const counts = [0, 1, 2, 3, 4];
  let requestIndex = 0;
  await page.route(SNAPSHOT_URL, (route) => {
    const count = counts[requestIndex++];
    const vessels = Array.from({ length: count }, (_, index) =>
      vessel(String(123450000 + index)),
    );
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(successBody(vessels)),
    });
  });

  await page.goto("/");
  const button = page.getByRole("button", { name: "Завантажити справжні позиції" });
  for (const count of counts) {
    await button.click();
    if (count === 0) {
      await expect(page.locator('[data-source="demo"]')).toHaveText("Демонстраційні дані");
      await expect(page.getByRole("status")).toHaveText(
        "Спроба 12:34:56 UTC: за час збору позицій не отримано",
      );
    } else {
      await expect(page.locator('[data-source="aisstream"]')).toContainText(`суден: ${count}`);
    }
    await expect(page.locator('[data-vessel-source="aisstream"]')).toHaveCount(count);
    await expect(page.locator('[data-vessel-source="demo"]')).toHaveCount(count < 3 ? 3 : 0);
    await expect(page.locator("[data-vessel-id]")).toHaveCount(count < 3 ? count + 3 : count);
  }

  expect(requestIndex).toBe(counts.length);
  expectTilesBlocked(tiles);
});

const API_ERRORS = [
  ["no_api_key", "Ключ AISStream не налаштовано"],
  ["connect_failed", "Не вдалося підключитися до джерела"],
  ["provider_error", "Джерело повернуло помилку"],
  ["disconnected", "З'єднання з джерелом розірвано"],
  ["internal", "Внутрішня помилка сервера"],
] as const;

for (const [code, message] of API_ERRORS) {
  test(`retains demo vessels after the ${code} API error`, async ({ page }) => {
    await page.route(SNAPSHOT_URL, (route) =>
      route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify(fixedError(code, message)),
      }),
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
    await expect(page.locator('[data-source="demo"]')).toHaveText("Демонстраційні дані");
    await expect(page.getByRole("status")).toHaveText(
      `Спроба 12:34:56 UTC: не вдалося отримати дані: ${message}`,
    );
    await expect(page.locator('[data-vessel-id^="demo-"]')).toHaveCount(3);
    await expect(page.locator('[data-vessel-source="aisstream"]')).toHaveCount(0);
    await expect(page.locator("[data-vessel-card-id]")).toHaveCount(0);
  });
}

test("keeps demo movement active after a structured snapshot failure", async ({ page }) => {
  await page.clock.install({ time: START_TIME });
  const tiles = await blockTiles(page);
  await page.route(SNAPSHOT_URL, (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify(fixedError("connect_failed", "Не вдалося підключитися до джерела")),
    }),
  );

  await page.goto("/");
  const marker = page.locator('[data-vessel-id="demo-1"]');
  const beforeFailure = await marker.evaluate(
    (element) => (element as HTMLElement).style.transform,
  );
  await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Спроба 12:34:56 UTC: не вдалося отримати дані: Не вдалося підключитися до джерела",
  );
  await page.clock.runFor(2_000);
  expect(
    await marker.evaluate((element) => (element as HTMLElement).style.transform),
  ).not.toBe(beforeFailure);
  await expect(page.locator('[data-source="demo"]')).toHaveText("Демонстраційні дані");
  await expect(page.locator('[data-vessel-id^="demo-"]')).toHaveCount(3);
  expectTilesBlocked(tiles);
});

test("retains the previous snapshot when a later request fails", async ({ page }) => {
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
      body: JSON.stringify(
        fixedError("connect_failed", "Не вдалося підключитися до джерела", NEXT_COLLECTED_AT),
      ),
    });
  });

  await page.goto("/");
  const button = page.getByRole("button", { name: "Завантажити справжні позиції" });
  await button.click();
  await expect(page.locator('[data-vessel-id="123456789"]')).toBeVisible();
  await page.locator('[data-vessel-id="123456789"]').click();
  await expect(page.locator('[data-vessel-card-id="123456789"]')).toBeVisible();

  await button.click();
  await expect(page.locator('[data-source="aisstream"]')).toHaveText(
    "AISStream · знімок за 15 с · отримано 12:34:56 UTC · суден: 1 · вибірка неповна",
  );
  await expect(page.getByRole("status")).toHaveText(
    "Спроба 12:35:56 UTC: не вдалося отримати дані: Не вдалося підключитися до джерела",
  );
  await expect(page.locator('[data-vessel-id="123456789"]')).toBeVisible();
  await expect(page.locator('[data-vessel-card-id="123456789"]')).toBeVisible();
  expect(requests).toBe(2);
});

test("updates or clears selection when a snapshot replaces the vessel set", async ({ page }) => {
  let requests = 0;
  await page.route(SNAPSHOT_URL, (route) => {
    requests += 1;
    const body =
      requests === 1
        ? successBody([vessel("123456789", { name: "Старе судно" })])
        : requests === 2
          ? successBody([vessel("123456789", { name: "Оновлене судно", speedKnots: 8.2 })], false, NEXT_COLLECTED_AT)
          : successBody([vessel("987654321")], false, NEXT_COLLECTED_AT);
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(body),
    });
  });

  await page.goto("/");
  const button = page.getByRole("button", { name: "Завантажити справжні позиції" });
  await button.click();
  const marker = page.locator('[data-vessel-id="123456789"]');
  await marker.click();
  const card = page.locator('[data-vessel-card-id="123456789"]');
  await expect(card.locator('dt:has-text("Назва") + dd')).toHaveText("Старе судно");

  await button.click();
  await expect(card.locator('dt:has-text("Назва") + dd')).toHaveText("Оновлене судно");
  await expect(card.locator('dt:has-text("Швидкість") + dd')).toHaveText("8.2 kn");
  await expect(marker).toHaveAttribute("data-selected", "true");

  await button.click();
  await expect(page.locator('[data-vessel-id="987654321"]')).toBeVisible();
  await expect(page.locator("[data-vessel-card-id]")).toHaveCount(0);
  await expect(page.locator('[data-vessel-id][data-selected="true"]')).toHaveCount(0);
  expect(requests).toBe(3);
});

for (const malformed of [
  { label: "invalid JSON", body: "{not-json" },
  { label: "invalid snapshot shape", body: JSON.stringify({ ok: true, vessels: [{}] }) },
]) {
  test(`retains demo vessels after ${malformed.label}`, async ({ page }) => {
    await page.route(SNAPSHOT_URL, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: malformed.body,
      }),
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
    await expect(page.locator('[data-source="demo"]')).toHaveText("Демонстраційні дані");
    await expect(page.getByRole("status")).toHaveText(NO_RESPONSE_MESSAGE);
    await expect(page.locator('[data-vessel-id^="demo-"]')).toHaveCount(3);
    await expect(page.locator('[data-vessel-source="aisstream"]')).toHaveCount(0);
  });
}

test("retains the snapshot and shows the exact no-body fallback", async ({ page }) => {
  let requests = 0;
  await page.route(SNAPSHOT_URL, (route) => {
    requests += 1;
    return requests === 1
      ? route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(successBody([vessel("123456789")])),
        })
      : route.fulfill({ status: 502, contentType: "application/json", body: "" });
  });

  await page.goto("/");
  const button = page.getByRole("button", { name: "Завантажити справжні позиції" });
  await button.click();
  const source = page.locator('[data-source="aisstream"]');
  await expect(source).toContainText("отримано 12:34:56 UTC · суден: 1");
  await button.click();
  await expect(source).toContainText("отримано 12:34:56 UTC · суден: 1");
  await expect(page.getByRole("status")).toHaveText(NO_RESPONSE_MESSAGE);
  await expect(page.locator('[data-vessel-id="123456789"]')).toBeVisible();
  expect(requests).toBe(2);
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
  await expect(page.getByText("Після оновлення сторінки знову показуються демонстраційні дані")).toBeVisible();
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
  const mapBounds = await map.boundingBox();
  expect(mapBounds).not.toBeNull();
  await page.mouse.move(mapBounds!.x + mapBounds!.width / 2, mapBounds!.y + mapBounds!.height / 2);
  await page.mouse.down();
  await page.mouse.move(
    mapBounds!.x + mapBounds!.width / 2 + 80,
    mapBounds!.y + mapBounds!.height / 2 + 30,
    { steps: 4 },
  );
  await page.mouse.up();
  await expect(map).not.toHaveAttribute("data-map-center", "51.0000,1.4500");
  const pannedCenter = await map.getAttribute("data-map-center");
  expect(pannedCenter).not.toBeNull();
  await button.click();
  await expect(page.locator('[data-source="aisstream"]')).toContainText("суден: 1");
  await expect(map).toHaveAttribute("data-map-zoom", "12");
  await expect(map).toHaveAttribute("data-map-center", pannedCenter!);
  await zoomIn.click();
  await expect(map).toHaveAttribute("data-map-zoom", "13");

  expect(requests).toBe(2);
  await page.reload();
  await expect(page.locator('[data-source="demo"]')).toHaveText("Демонстраційні дані");
  await expect(page.locator("[data-vessel-id]")).toHaveCount(3);
  expectTilesBlocked(tiles);
});

test.describe("R3 snapshot UI states", () => {
  test("retains demo vessels after a fixed error response", async ({ page }) => {
    const tiles = await blockTiles(page);
    await page.route(SNAPSHOT_URL, (route) =>
      route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify(
          fixedError("connect_failed", "Не вдалося підключитися до джерела"),
        ),
      }),
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
    await expect(page.locator('[data-source="demo"]')).toHaveText("Демонстраційні дані");
    await expect(page.getByRole("status")).toHaveText(
      "Спроба 12:34:56 UTC: не вдалося отримати дані: Не вдалося підключитися до джерела",
    );
    await expect(page.locator('[data-vessel-id^="demo-"]')).toHaveCount(3);
    await expect(page.locator("[data-vessel-card-id]")).toHaveCount(0);
    expectTilesBlocked(tiles);
  });

  test("retains demo vessels after an empty snapshot response", async ({ page }) => {
    const tiles = await blockTiles(page);
    await page.route(SNAPSHOT_URL, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(successBody([])),
      }),
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
    await expect(page.locator('[data-source="demo"]')).toHaveText("Демонстраційні дані");
    await expect(page.getByRole("status")).toHaveText(
      "Спроба 12:34:56 UTC: за час збору позицій не отримано",
    );
    await expect(page.locator('[data-vessel-source="demo"]')).toHaveCount(3);
    await expect(page.locator('[data-vessel-source="aisstream"]')).toHaveCount(0);
    await expect(page.locator("[data-vessel-card-id]")).toHaveCount(0);
    expectTilesBlocked(tiles);
  });

  test("shows missing motion values on a selected successful vessel", async ({ page }) => {
    const tiles = await blockTiles(page);
    await page.route(SNAPSHOT_URL, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(
          successBody([vessel("345678901", { speedKnots: null, courseDeg: null })]),
        ),
      }),
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Завантажити справжні позиції" }).click();
    const marker = page.locator('[data-vessel-id="345678901"]');
    await marker.click();

    const card = page.locator('[data-vessel-card-id="345678901"]');
    await expect(card).toBeVisible();
    await expect(card.locator('dt:has-text("Швидкість") + dd')).toHaveText("Немає даних");
    await expect(card.locator('dt:has-text("Курс") + dd')).toHaveText("Немає даних");
    await expect(marker).toHaveAttribute("data-icon", "neutral");
    expectTilesBlocked(tiles);
  });
});
