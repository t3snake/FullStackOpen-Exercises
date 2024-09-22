import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Toast from "./Toast";

import { toggleCreateFormVisibility, initializeBlogs, setToken } from "../reducers/blogReducer";
import { logoutUser } from "../reducers/userReducer";

const BlogPage = () => {
    const {blogs, isCreateVisible} = useSelector(state => state.blogPage)
    const user = useSelector(state => state.user)
    
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
        dispatch(logoutUser())
    };

    useEffect(() => {
        dispatch(initializeBlogs())
    }, []);

    return (
        <div>
            <p>
                {user.name} logged in
                <button onClick={logout}>Logout</button>
            </p>

            <Toast />

            {isCreateVisible && <BlogForm />}

            {/* Button to toggle Form */}
            <button onClick={toggleVisibilityCreate}>
                {toggleButtonText()}
            </button>

            <h2> Blogs </h2>
            {blogs
                .toSorted((blog1, blog2) => {
                    return blog2.likes - blog1.likes;
                })
                .map((blog) => ( <Blog key={blog.id} blog={blog} /> )
            )}
        </div>
    );
};

export default BlogPage;
