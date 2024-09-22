import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Toast from "./Toast";

import blogReducer, {toggleCreateFormVisibility, initializeBlogs} from "../reducers/blogReducer";
import blogService from "../services/blogs";

const BlogPage = ({ user, setUser }) => {
    const {blogs, isCreateVisible} = useSelector(state => state.blogPage)
    // const [blogs, setBlogs] = useState([]);
    // const [isCreateVisible, setCreateVisible] = useState(false);
    const dispatch = useDispatch()

    blogService.setToken(user.token);

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

    // const getAllBlogs = async () => {
    //     const newBlogs = await blogService.getBlogs();
    //     setBlogs(newBlogs);
    // };

    useEffect(() => {
        // getAllBlogs();
        dispatch(initializeBlogs())
    }, []);

    const blogFormProps = {
        // setBlogs,
        user,
        blogService,
        // getAllBlogs,
    };

    const blogProps = {
        user,
        blogService,
        // getAllBlogs,
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
