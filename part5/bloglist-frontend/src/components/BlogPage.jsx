import { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Toast from './Toast'
import blogService from '../services/blogs'

const BlogPage = ({ user, setUser, message, setMessage, setMessageType }) => {
    const [blogs, setBlogs] = useState([])
    const [isCreateVisible, setCreateVisible] = useState(false)

    blogService.setToken(user.token)

    const toggleVisibilityCreate = () => {
        setCreateVisible(!isCreateVisible)
    }

    const toggleButtonText = () => {
        if (isCreateVisible) return 'Close'
        return 'Add Blog'
    }

    const logout = () => {
        window.localStorage.removeItem('loggedInBlogListUser')
        setUser(null)
    }

    const getAllBlogs = async () => {
        const response = await blogService.getBlogs()
        const allBlogs = response.filter(blog => blog.user.username === user.username)
        setBlogs(allBlogs)
    }

    useEffect( () => {
        getAllBlogs()
    }, [])

    const blogFormProps = {
        blogs, 
        setBlogs, 
        setMessage, 
        setMessageType, 
        blogService
    }

    const blogProps = {
        blogService,
        setMessage,
        setMessageType,
        getAllBlogs
    }

    return (
        <div>
            <p>
                {user.name} logged in
                <button onClick={logout}>Logout</button>
            </p>

            <Toast message={message} setMessage={setMessage} />

            { isCreateVisible && <BlogForm {...blogFormProps} /> }

            {/* Button to toggle Form */}
            <button onClick={toggleVisibilityCreate}>
                {toggleButtonText()}
            </button>

            <h2> Blogs </h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} {...blogProps} />
            )}
        </div>
    )
}

export default BlogPage