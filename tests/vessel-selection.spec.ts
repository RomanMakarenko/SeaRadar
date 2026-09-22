import { expect, test } from "@playwright/test";

const OSM_TILE_PREFIX = "https://tile.openstreetmap.org/";

function isOsmTileRequest(url: string): boolean {
  return url.startsWith(OSM_TILE_PREFIX);
}

test("selects each demo vessel and keeps its card open", async ({ page }) => {
  let blockedTileRequests = 0;
  let completedTileRequests = 0;

  await page.route("https://tile.openstreetmap.org/**", async (route) => {
    blockedTileRequests += 1;
    await route.abort();
  });
  page.on("requestfinished", (request) => {
    if (isOsmTileRequest(request.url())) {
      completedTileRequests += 1;
    }
  });

  await page.goto("/");

  const markers = page.locator("[data-vessel-id]");
  await expect(markers).toHaveCount(3);

  const vesselIds = await markers.evaluateAll((elements) =>
    elements
      .map((element) => element.getAttribute("data-vessel-id"))
      .sort(),
  );
  expect(vesselIds).toEqual(["demo-1", "demo-2", "demo-3"]);

  for (const vesselId of vesselIds) {
    const marker = page.locator(`[data-vessel-id="${vesselId}"]`);
    const card = page.locator(`[data-vessel-card-id="${vesselId}"]`);

    await marker.click();
    await expect(card).toBeVisible();

    await marker.click();
    await expect(card).toBeVisible();
  }

  expect(blockedTileRequests).toBeGreaterThan(0);
  expect(completedTileRequests).toBe(0);
});
