import { useState } from "react";
import { pushNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const BlogForm = ({
    user,
    blogService,
    getAllBlogs,
}) => {
    // State for create form inputs
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [author, setAuthor] = useState("");

    const dispatch = useDispatch()

    const createNewBlog = async (event) => {
        event.preventDefault();

        try {
            // const newBlog = await blogService.addBlog(title, url, author);
            // await getAllBlogs();
            dispatch(createBlog(title, url, author, user))

            dispatch(pushNotification(`${title} successfully added`, "success", 5))

            setTitle("");
            setAuthor("");
            setUrl("");
        } catch (error) {
            dispatch(pushNotification(`Blog add failed due to ${error.message}`, "error", 5))
        }
    };

    return (
        <div>
            <h2> Add new blog </h2>
            <form onSubmit={createNewBlog}>
                <div>
                    Title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        data-testid="title-field"
                    />
                </div>

                <div>
                    Author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        data-testid="author-field"
                    />
                </div>

                <div>
                    URL:
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        onChange={({ target }) => setUrl(target.value)}
                        data-testid="url-field"
                    />
                </div>

                <button type="submit"> Add </button>
            </form>
        </div>
    );
};

export default BlogForm;
