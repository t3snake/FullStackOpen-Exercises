import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogPage = ({ user, setUser }) => {
    const [blogs, setBlogs] = useState([])

    blogService.setToken(user.token)

    const logout = () => {
        window.localStorage.removeItem('loggedInBlogListUser')
        setUser(null)
    }

    useEffect( () => {
        const getAllBlogs = async () => {
            const allBlogs = await blogService.getBlogs()
            setBlogs(allBlogs)
        }
        getAllBlogs()
    }, [])

    return (
        <div>
        <h2>blogs</h2>
        <p>
            {user.name} logged in
            <button onClick={logout}>Logout</button>
        </p>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
        </div>
    )
}
  
export default BlogPage