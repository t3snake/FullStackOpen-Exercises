import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { pushNotification } from "../reducers/notificationReducer";


const BlogView = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const id = useParams().id
    const { blogs } = useSelector(state => state.blogPage)
    console.log(blogs)
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
        </div>
    );
};

export default BlogView;
