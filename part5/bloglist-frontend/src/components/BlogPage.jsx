import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogPage = ({ user }) => {
    const [blogs, setBlogs] = useState([])

    useEffect( () => {
        const getAllBlogs = async () => {
        const allBlogs = await blogService.getAll()
        setBlogs(allBlogs)
        }
        getAllBlogs()
    }, [])

    return (
        <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
        </div>
    )
}
  
export default BlogPage