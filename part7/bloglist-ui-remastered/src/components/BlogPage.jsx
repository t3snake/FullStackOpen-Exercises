import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Toast from "./Toast";

import {toggleCreateFormVisibility, initializeBlogs, setToken} from "../reducers/blogReducer";

const BlogPage = ({ user, setUser }) => {
    const {blogs, isCreateVisible} = useSelector(state => state.blogPage)
    const dispatch = useDispatch()

    setToken(user.token);

    const toggleVisibilityCreate = () => {
        dispatch(toggleCreateFormVisibility())
    };

    const toggleButtonText = () => {
        if (isCreateVisible) return "Close";
        return "Add Blog";
    };

    const logout = () => {
        window.localStorage.removeItem("loggedInBlogListUser");
        setUser(null);
    };

    useEffect(() => {
        dispatch(initializeBlogs())
    }, []);

    const blogFormProps = {
        user,
    };

    const blogProps = {
        user,
    };

    return (
        <div>
            <p>
                {user.name} logged in
                <button onClick={logout}>Logout</button>
            </p>

            <Toast />

            {isCreateVisible && <BlogForm {...blogFormProps} />}

            {/* Button to toggle Form */}
            <button onClick={toggleVisibilityCreate}>
                {toggleButtonText()}
            </button>

            <h2> Blogs </h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} {...blogProps} />
            ))}
        </div>
    );
};

export default BlogPage;
