import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { pushNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
    // State for create form inputs
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [author, setAuthor] = useState("");

    const user = useSelector(state => state.user)

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
        <Paper sx={{my: 2, p: 2}}>
            <Typography variant="h4"> Add new blog </Typography>
            <form onSubmit={createNewBlog}>
                <div>
                    <TextField
                        id="standard-controlled"
                        variant="standard"
                        value={title}
                        label="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>

                <div>
                    <TextField
                        id="standard-controlled"
                        variant="standard"
                        value={author}
                        label="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>

                <div>
                    <TextField
                        id="standard-controlled"
                        variant="standard"
                        value={url}
                        label="URL"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>

                <Button variant="contained" color="secondary" type="submit" sx={{my: 2}}> Add </Button>
            </form>
        </Paper>
    );
};

export default BlogForm;
