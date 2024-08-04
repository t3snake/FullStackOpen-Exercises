import { useState } from 'react'

const Blog = ({ blog, user, blogService, setMessage, setMessageType, getAllBlogs }) => {
    const [isDetailVisible, setDetailsVisible] = useState(false)

    const toggleDetails = () => {
        setDetailsVisible(!isDetailVisible)
    }

    const isBlogByUser = blog.user.username === user.username

    const blogStyle = {
        margin: '20px',
        border: '3px solid darkgray',
        padding: '10px',
        backgroundColor: 'beige'
    }

    const detailsStyle = {
        display: isDetailVisible? '': 'none',
        textIndent: '20px'
    }

    const toggleButtonText = () => {
        return isDetailVisible ? 'Hide': 'Show more'
    }

    const deleteUser = async () => {
        try {
            if( window.confirm(`Delete Blog ${blog.title}?`) ) {
                const response = await blogService.deleteBlog(blog.id)
                if ( response.status === 204) {
                    await getAllBlogs()

                    setMessage(`Blog: ${blog.title} deleted successfully`)
                    setMessageType('success')
                }
            }
        } catch (error) {
            setMessage(`Blog delete failed due to ${error.message}`)
            setMessageType('error')
        }
    }

    const addLike = async () => {
        const modifiedBlog = await blogService.addLikeOnBlog(blog)
        const id = blog.id
        await getAllBlogs()
    }

    return (
        <div style={blogStyle}>
            <span data-testid="blog-title">{blog.title}</span>
            <button onClick={toggleDetails}> {toggleButtonText()} </button>
            <div className="togglable-info" style={detailsStyle}>
                <div>{blog.url}</div>
                <div data-testid="likes">
                    {blog.likes}
                   <button onClick={addLike}>Like</button>
                </div>
                {isBlogByUser && <button onClick={deleteUser}>Delete</button>}
            </div>
            <div>by {blog.author}</div>
        </div>
    )
}

export default Blog