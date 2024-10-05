import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { deleteBlog, likeBlog, commentOnBlog } from "../reducers/blogReducer";
import { pushNotification } from "../reducers/notificationReducer";
import { useState } from "react";


const BlogView = () => {
const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const id = useParams().id
    const { blogs } = useSelector(state => state.blogPage)
    const blog = blogs.find(blog => blog.id === id)

    if ( !blog ){
        return null
    }

    const isBlogByUser = blog.user.username === user.username;

    const deleteBlogByUser = async () => {
        try {
            if (window.confirm(`Delete Blog ${blog.title}?`)) {
                dispatch(deleteBlog(blog.id))
                dispatch(pushNotification(`Blog: ${blog.title} deleted successfully`, "success", 5))
                
            }
        } catch (error) {
            dispatch(pushNotification(`Blog delete failed due to ${error.message}`, "error", 5))
        }
    };

    const addLike = async () => {
        dispatch(likeBlog(blog))

        dispatch(pushNotification(`Liked ${blog.title}`, "success", 5))
    };

    const addComment = async (event) => {
        event.preventDefault()
        try{
            dispatch(commentOnBlog(blog.id, comment))
            dispatch(pushNotification(`Comment '${comment}' successfully added`, "success", 5))
            setComment('')
        } catch(error) {
            dispatch(pushNotification(`Comment add failed due to ${error.message}`, "error", 5))
        }
    }

    return (
        <div>
            <h2 data-testid="blog-title">
                {blog.title} by {blog.author}
            </h2>
            <div>{blog.url}</div>
            <div data-testid="likes">
                {blog.likes}
                <button onClick={addLike}>Like</button>
            </div>
            <div>added by {blog.user.name}</div>
            {isBlogByUser && <button onClick={deleteBlogByUser}>Delete</button>}

            <h3>Comments</h3>
            <form onSubmit={addComment}>
                <input
                    type="text"
                    value={comment}
                    name="Comment"
                    onChange={({ target }) => setComment(target.value)}
                />
                <button type="submit"> Add comment </button>
            </form>
            <ul>
                {blog.comments.map( (comment, index) => {
                    return (
                        <li key={index}>
                            {comment}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default BlogView;
