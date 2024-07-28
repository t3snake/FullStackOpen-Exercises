import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import { beforeEach } from 'vitest'

const blog = {
    title: "BlogTitle",
    url: "BlogUrl",
    author: "BlogAuthor",
    likes: 15,
    user: "123"
}

const blogProps = {}

beforeEach(() => {
    
    const setMessage = vi.fn()
    const setMessageType = vi.fn()

    const getAllBlogs = () => [blog,]

    let blogProps = {
        blogService,
        setMessage,
        setMessageType,
        getAllBlogs
    }
})

test('renders blog with togglable info initially hidden', () => {
    let container = render(<Blog key={1} blog={blog} {...blogProps} /> ).container
  
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
    
    let container = render(<Blog key={1} blog={blog} {...blogProps} /> ).container
    
    let user = userEvent.setup()

    const showButton = screen.getByText('show', { exact: false })
    await user.click(showButton)

    const toggledElement = container.querySelector('.togglable-info')
    expect(toggledElement).toHaveStyle('display: block')

    const buttonText = screen.getByText('hide', { exact: false })
    expect(buttonText).toBeDefined()
  
})