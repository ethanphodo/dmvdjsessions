import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const pages = [
  { name: 'Home', url: '/' },
  { name: 'Sessions', url: '/sessions' },
  { name: 'Events', url: '/events' },
  { name: 'Submit', url: '/submit' },
  { name: 'About', url: '/about' },
  { name: 'DJ-Profile', url: '/dj/marcus-cole' },
  { name: 'Session-Detail', url: '/sessions/vid-001' },
];

// Test each page at each viewport size
for (const viewport of viewports) {
  for (const page of pages) {
    test(`${page.name} - ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page: browserPage }) => {
      // Set viewport size
      await browserPage.setViewportSize({ width: viewport.width, height: viewport.height });

      // Navigate to the page
      await browserPage.goto(page.url);

      // Wait for network to be idle (fonts, images loaded)
      await browserPage.waitForLoadState('networkidle');

      // Wait a bit more for any animations to settle
      await browserPage.waitForTimeout(500);

      // Take screenshot and compare to baseline
      await expect(browserPage).toHaveScreenshot(`${page.name}-${viewport.name}.png`, {
        fullPage: true,
        maxDiffPixels: 50, // Allow small differences for anti-aliasing
        threshold: 0.1, // 10% threshold for pixel comparison
      });
    });
  }
}

// Specific alignment checks
test('Sessions page - filters should be centered', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/sessions');
  await page.waitForLoadState('networkidle');

  // Check that the "Showing X of X" container has centered content
  const showingText = page.locator('text=Showing').first();
  const parentStyle = await showingText.evaluate((el) => {
    const parent = el.closest('.flex');
    if (!parent) return null;
    const style = window.getComputedStyle(parent);
    return {
      justifyContent: style.justifyContent,
      display: style.display,
    };
  });

  // Should be using flexbox with center justification
  expect(parentStyle?.display).toBe('flex');
  expect(parentStyle?.justifyContent).toBe('center');
});

test('Hero text should be centered', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Check that the hero container has text-center class applied
  const heroContainer = page.locator('.text-center').first();
  const computedStyle = await heroContainer.evaluate((el) => {
    return window.getComputedStyle(el).textAlign;
  });

  expect(computedStyle).toBe('center');

  // Also verify the container is centered via margins
  const container = page.locator('.container-main').first();
  const marginStyle = await container.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      marginLeft: style.marginLeft,
      marginRight: style.marginRight,
    };
  });

  // Both margins should be 'auto' or equal pixel values
  expect(marginStyle.marginLeft).toBe(marginStyle.marginRight);
});
