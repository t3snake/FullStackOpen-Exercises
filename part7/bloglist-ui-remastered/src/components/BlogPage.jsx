import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import BlogForm from "./BlogForm";

import { toggleCreateFormVisibility, initializeBlogs, setToken } from "../reducers/blogReducer";

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

    return (
        <div>
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
                .map((blog) => ( 
                    <div key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                    </Link> 
                    </div>)
            )}
        </div>
    );
};

export default BlogPage;
