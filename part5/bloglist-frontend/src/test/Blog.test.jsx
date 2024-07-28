import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import { beforeEach, vi } from 'vitest'

const blog = {
    title: "BlogTitle",
    url: "BlogUrl",
    author: "BlogAuthor",
    likes: 15,
    user: "123"
}

let blogProps = {}
let blogService = {}

beforeEach(() => {
    
    const setMessage = vi.fn()
    const setMessageType = vi.fn()

    const getAllBlogs = vi.fn()

    blogService.addLikeOnBlog = vi.fn( (blog) => 1 )

    blogProps = {
        setMessage,
        setMessageType,
        getAllBlogs,
    }
})

test('renders blog with togglable info initially hidden', () => {
    let container = render(<Blog key={1} blog={blog} blogService={blogService} {...blogProps} /> ).container
  
    const toggledElement = container.querySelector('.togglable-info')
    expect(toggledElement).toHaveStyle('display: none')

    const buttonText = screen.getByText('show', { exact: false })
    expect(buttonText).toBeDefined()

    const blogTitle = screen.getByText('BlogTitle')
    expect(blogTitle).toBeDefined()

    const blogAuthor = screen.getByText('BlogAuthor', { exact: false })
    expect(blogAuthor).toBeDefined()
})

test('toggles visibility on clicking show', async () => {
    let user = userEvent.setup()

    let container = render(<Blog key={1} blog={blog} blogService={blogService} {...blogProps} /> ).container
    
    const showButton = screen.getByText('show', { exact: false })
    await user.click(showButton)

    const toggledElement = container.querySelector('.togglable-info')
    expect(toggledElement).toHaveStyle('display: block')

    const buttonText = screen.getByText('hide', { exact: false })
    expect(buttonText).toBeDefined()
  
})

test('clicks on like button executes addClick function', async () => {
    let user = userEvent.setup()
    console.log(blogProps)
    let container = render(<Blog key={1} blog={blog} blogService={blogService} {...blogProps} /> ).container

    const showButton = screen.getByText('show', { exact: false })
    await user.click(showButton)

    const likeButton = screen.getByText('like', { exact: false })
    await user.click(likeButton)
    await user.click(likeButton)
    expect(blogService.addLikeOnBlog.mock.calls).toHaveLength(2)
})