import { useState, useEffect } from 'react'
import Blog from './Blog'
import Toast from './Toast'
import blogService from '../services/blogs'

const BlogPage = ({ user, setUser, message, setMessage, setMessageType }) => {
    const [blogs, setBlogs] = useState([])

    // State for create form inputs
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')

    blogService.setToken(user.token)

    const getAllBlogs = async () => {
        const response = await blogService.getBlogs()
        const allBlogs = response.filter(blog => blog.user.username === user.username)
        setBlogs(allBlogs)
    }

    const logout = () => {
        window.localStorage.removeItem('loggedInBlogListUser')
        setUser(null)
    }

    const createNewBlog = async (event) => {
        event.preventDefault()

        try{
            const newBlog = await blogService.addBlog(title, url, author)
            const newBlogs = blogs.concat(newBlog)
            setBlogs(newBlogs)

            setMessage(`${title} successfully added`)
            setMessageType('success')

            setTitle('')
            setAuthor('')
            setUrl('')
        } catch(error) {
            setMessage(`Blog add failed due to ${error.message}`)
            setMessageType('error')
        }
        

    }

    useEffect( () => {
        getAllBlogs()
    }, [])

    return (
        <div>
            <p>
                {user.name} logged in
                <button onClick={logout}>Logout</button>
            </p>

            <Toast message={message} setMessage={setMessage} />
            
            <h2> blogs </h2>  
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

            <h2> Add new blog </h2>
            <form onSubmit={createNewBlog}>
                <div>
                    Title:
                    <input 
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({target}) => setTitle(target.value)}/>
                </div>

                <div>
                    Author:
                    <input 
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({target}) => setAuthor(target.value)}/>
                </div>

                <div>
                    URL:
                    <input 
                    type="text"
                    value={url}
                    name="URL"
                    onChange={({target}) => setUrl(target.value)}/>
                </div>

                <button type='submit'> Add </button>
            </form>
        </div>
    )
}
  
export default BlogPage