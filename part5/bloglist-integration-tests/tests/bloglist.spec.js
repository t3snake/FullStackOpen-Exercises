const { describe, test, expect, beforeEach } = require('@playwright/test')

const login = async (page, username, password) => {
    await page.getByTestId('user-field').fill(username)
    await page.getByTestId('password-field').fill(password)

    await page.getByRole('button').getByText('Login').click()
}

const fillBlogForm = async (page, title, author, url) => {
    await page.getByTestId('title-field').fill(title)
    await page.getByTestId('author-field').fill(author)
    await page.getByTestId('url-field').fill(url)

    await page.getByRole('button').getByText('Add').click()
}

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
            await login(page, 'test.user', 'test@password')
            await expect(page.getByText(/test user logged in/)).toBeVisible()
            
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await login(page, 'test.user', 'wrong@password')
            await expect(page.getByText('Incorrect Credentials')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'test.user', 'test@password')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button').getByText('Add Blog').click()
            await expect(page.getByText('Add new blog')).toBeVisible()

            await fillBlogForm(page, 'blog.title', 'blog.author', 'blog.url')
            const locator = await page.getByTestId('blog-title')
            await expect(locator).toContainText('blog.title')
            await expect(locator).toBeVisible()
        })
      })

      describe('Blog interactions', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'test.user', 'test@password')
            await page.getByRole('button').getByText('Add Blog').click()      
            await fillBlogForm(page, 'blog.title', 'blog.author', 'blog.url')
            await page.getByRole('button').getByText('Show More').click()

        })

        test('new blog has 0 likes initially', async ({ page }) => {
            await expect(page.getByTestId('likes')).toContainText('0')
        })
      
        test('blog can be liked', async ({ page }) => {
            await page.getByRole('button').getByText('Like').click()

            await expect(page.getByTestId('likes')).toContainText(/1/)
        })

        test('blog can be deleted by same user', async ({ page }) => {
            page.on('dialog', dialog => dialog.accept())
            await page.getByRole('button').getByText('Delete').click()

            await expect(page.getByText(/blog.title deleted/)).toBeVisible()

        })
      })
})