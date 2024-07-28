import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

test('renders blog', () => {
    const blog = {
        title: "BlogTitle",
        url: "BlogUrl",
        author: "BlogAuthor",
        likes: 15,
        user: "123"
    }

    const setMessage = vi.fn()
    const setMessageType = vi.fn()

    const getAllBlogs = () => [blog,]

    const blogProps = {
        blogService,
        setMessage,
        setMessageType,
        getAllBlogs
    }

    let container = render(<Blog key={1} blog={blog} {...blogProps} /> ).container
  
    const toggledElement = container.querySelector('.togglable-info')
    expect(toggledElement).toHaveStyle('display: none')

    const blogTitle = screen.getByText('BlogTitle')
    expect(blogTitle).toBeDefined()

    const blogAuthor = screen.getByText('BlogAuthor', { exact: false })
    expect(blogAuthor).toBeDefined()
})