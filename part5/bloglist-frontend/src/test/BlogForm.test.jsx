import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import { beforeEach, vi } from 'vitest'
import BlogForm from '../components/BlogForm'

test('test BlogForm', async () => {
    const blogs = [{
        title: "BlogTitle",
        url: "BlogUrl",
        author: "BlogAuthor",
        likes: 15,
        user: "123"
    },]

    const setBlogs = vi.fn()
    const setMessage = vi.fn()
    const setMessageType = vi.fn()
    const getAllBlogs = vi.fn()


    const blogFormProps = {
        blogs, 
        setBlogs, 
        setMessage, 
        setMessageType,
        getAllBlogs
    }
    
    let blogService = { }
    blogService.addBlog = vi.fn( (title, url, author) => 1 )
    blogService.getAllBlogs = vi.fn()

    const user = userEvent.setup()

    const container = render(<BlogForm blogService={blogService} {...blogFormProps} />).container

    const titleField = screen.getByTestId('title-field')
    await user.type(titleField, 'ABC')

    const authorField = screen.getByTestId('author-field')
    await user.type(authorField, 'XYZ')

    const urlField = screen.getByTestId('url-field')
    await user.type(urlField, 'abc.com')

    const addButton = screen.getByText('Add')
    await user.click(addButton)

    const calls = blogService.addBlog.mock.calls
    expect(calls).toHaveLength(1)
    expect(calls[0]).toContain('ABC')
    expect(calls[0]).toContain('XYZ')
    expect(calls[0]).toContain('abc.com')
})