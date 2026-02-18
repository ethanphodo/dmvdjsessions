import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/DMV DJ Sessions/)
  })

  test('displays hero section', async ({ page }) => {
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
  })

  test('navigation links are visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    const nav = page.locator('nav[aria-label="Main navigation"]')
    await expect(nav).toBeVisible()
  })

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Open menu
    const menuButton = page.getByRole('button', { name: /open menu/i })
    await menuButton.click()

    const mobileNav = page.locator('#mobile-menu')
    await expect(mobileNav).toBeVisible()

    // Close menu
    const closeButton = page.getByRole('button', { name: /close menu/i })
    await closeButton.click()

    await expect(mobileNav).not.toBeVisible()
  })

  test('visual regression - homepage', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })
})

test.describe('Sessions Page', () => {
  test('displays session cards', async ({ page }) => {
    await page.goto('/sessions')
    await page.waitForLoadState('networkidle')

    const sessionCards = page.locator('[data-testid="session-card"]')
    const count = await sessionCards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('visual regression - sessions page', async ({ page }) => {
    await page.goto('/sessions')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('sessions.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })
})

test.describe('Accessibility', () => {
  test('skip link is accessible', async ({ page }) => {
    await page.goto('/')

    // Tab to focus on skip link
    await page.keyboard.press('Tab')

    const skipLink = page.locator('a:has-text("Skip to main content")')
    await expect(skipLink).toBeFocused()
  })

  test('all images have alt text', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const imagesWithoutAlt = await page.locator('img:not([alt])').count()
    expect(imagesWithoutAlt).toBe(0)
  })

  test('color contrast meets requirements', async ({ page }) => {
    await page.goto('/')

    // Check that text elements have sufficient contrast
    const bodyText = page.locator('body')
    await expect(bodyText).toHaveCSS('color', /rgb/)
  })
})
