import { useState } from "react";
import { useDispatch } from "react-redux";

import { initializeBlogs, deleteBlog, likeBlog } from "../reducers/blogReducer";
import { pushNotification } from "../reducers/notificationReducer";


const Blog = ({
    blog,
    user,
}) => {
    const dispatch = useDispatch()

    const [isDetailVisible, setDetailsVisible] = useState(false);

    const toggleDetails = () => {
        setDetailsVisible(!isDetailVisible);
    };

    const isBlogByUser = blog.user.username === user.username;

    const blogStyle = {
        margin: "20px",
        border: "3px solid darkgray",
        padding: "10px",
        backgroundColor: "beige",
    };

    const detailsStyle = {
        display: isDetailVisible ? "" : "none",
        textIndent: "20px",
    };

    const toggleButtonText = () => {
        return isDetailVisible ? "Hide" : "Show more";
    };

    const deleteUser = async () => {
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
        // const modifiedBlog = await blogService.addLikeOnBlog(blog);
        // const id = blog.id;
        dispatch(likeBlog(blog))

        dispatch(pushNotification(`Liked ${blog.title}`, "success", 5))
    };

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
    );
};

export default Blog;
