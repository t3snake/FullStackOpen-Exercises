const { describe, test, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'test user',
                username: 'test.user',
                password: 'test@password'
            }
        })
        await page.goto('http://localhost:5173')
    })
  
    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('user.field').fill('test.user')
            await page.getByTestId('password.field').fill('test@password')

            await page.getByRole('button').getByText('Login').click()

            await expect(page.getByText(/test user logged in/)).toBeVisible()
            
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('user.field').fill('test.user')
            await page.getByTestId('password.field').fill('wrong@password')

            await page.getByRole('button').getByText('Login').click()

            await expect(page.getByText('Incorrect Credentials')).toBeVisible()
        })
    })
})