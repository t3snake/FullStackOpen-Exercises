import { useState } from "react"

const Blog = ({ blog, blogService, blogs, setBlogs, getAllBlogs }) => {
    const [isDetailVisible, setDetailsVisible] = useState(false)

    const toggleDetails = () => {
        setDetailsVisible(!isDetailVisible)
    }

    const blogStyle = {
        margin: '20px',
        border: '3px solid darkgray',
        padding: '10px',
        backgroundColor: 'beige'
    }

    const detailsStyle = {
        display: isDetailVisible? '': "none",
        textIndent: '20px'
    }

    const toggleButtonText = () => {
        return isDetailVisible ? 'Hide': 'Show more'
    }

    const addLike = async () => {
        const modifiedBlog = await blogService.addLikeOnBlog(blog)
        const id = blog.id

        await getAllBlogs()

    }

    return (
        <div style={blogStyle}>
            {blog.title} 
            <button onClick={toggleDetails}> {toggleButtonText()} </button>
            <div style={detailsStyle}>
                <div>by {blog.author}</div>
                <div>{blog.url}</div>
                <div>
                    {blog.likes}
                    <button onClick={addLike}>Like</button>
                </div>
            </div>
        </div>  
      )
      
}
export default Blog