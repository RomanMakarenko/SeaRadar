import { expect, test, type Page } from "@playwright/test";

const OSM_TILE_PREFIX = "https://tile.openstreetmap.org/";
const SNAPSHOT_URL = "**/api/snapshot";
const START_TIME = new Date("2026-09-29T12:00:00.000Z");
const ROUTE_COORDINATES = [
  "51.00000, 1.45000",
  "51.01000, 1.45000",
  "51.02000, 1.46500",
  "51.03000, 1.48000",
  "51.04000, 1.49500",
  "51.05000, 1.51000",
  "51.06000, 1.52500",
  "51.07000, 1.54000",
  "51.08000, 1.55500",
  "51.09000, 1.57000",
] as const;

interface TileRequests {
  blocked: number;
  completed: number;
}

async function blockTiles(page: Page): Promise<TileRequests> {
  const stats: TileRequests = { blocked: 0, completed: 0 };
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

function expectTilesBlocked(stats: TileRequests): void {
  expect(stats.blocked).toBeGreaterThan(0);
  expect(stats.completed).toBe(0);
}

test("moves demo-1 through its literal route and freezes at the endpoint", async ({ page }) => {
  await page.clock.install({ time: START_TIME });
  const tiles = await blockTiles(page);
  let snapshotRequests = 0;
  await page.route(SNAPSHOT_URL, async (route) => {
    snapshotRequests += 1;
    await route.abort();
  });

  await page.goto("/");
  const marker = page.locator('[data-vessel-id="demo-1"]');
  await expect(marker).toBeVisible();
  await marker.click();

  const card = page.locator('[data-vessel-card-id="demo-1"]');
  await expect(card).toBeVisible();
  const coordinates = card.locator('dt:has-text("Координати") + dd');
  const speed = card.locator('dt:has-text("Швидкість") + dd');
  const course = card.locator('dt:has-text("Курс") + dd');
  const timestamp = card.locator('dt:has-text("Час повідомлення") + dd');

  await expect(coordinates).toHaveText(ROUTE_COORDINATES[0]);
  for (const expectedCoordinates of ROUTE_COORDINATES.slice(1)) {
    await page.clock.runFor(2_000);
    await expect(coordinates).toHaveText(expectedCoordinates);
  }

  await expect(speed).toHaveText("0 kn");
  await expect(course).toHaveText("43°");
  await expect(timestamp).toHaveText("12:00:18 UTC");
  expect(snapshotRequests).toBe(0);

  await page.clock.runFor(2_000);
  await expect(coordinates).toHaveText("51.09000, 1.57000");
  await expect(speed).toHaveText("0 kn");
  await expect(course).toHaveText("43°");
  await expect(timestamp).toHaveText("12:00:18 UTC");
  expect(snapshotRequests).toBe(0);
  expectTilesBlocked(tiles);
});
