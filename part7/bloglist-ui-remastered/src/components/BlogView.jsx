import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

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
        <>
        <Paper sx={{p:2, my:2}}>
            <Typography variant="h3">
                {blog.title} by {blog.author}
            </Typography>
            <Typography>{blog.url}</Typography>
            <Typography>added by {blog.user.name}</Typography>
            <Box sx={{my: 2}}>
                <Typography>{blog.likes} Likes</Typography>
                <Button variant="contained" color="secondary" onClick={addLike}>Like</Button>
            </Box>
            
            {isBlogByUser && <Button variant="contained" color="secondary" onClick={deleteBlogByUser}>Delete</Button>}
        </Paper>

        <Paper sx={{p:2, my:2}}>
            <Typography variant="h4" sx={{my: 2}}>Comments</Typography>
            <form onSubmit={addComment}>
                <TextField
                    id="standard-controlled"
                    type="text"
                    value={comment}
                    label="Comment"
                    onChange={({ target }) => setComment(target.value)}
                />
                <Button type="submit" color="secondary" variant="contained" sx={{mx: 2}}> Add comment </Button>
            </form>
            <List sx={{bgcolor: 'background.paper'}}>
                {blog.comments.map( (comment, index) => {
                    return (
                        <ListItem key={index}>
                            {comment}
                        </ListItem>
                    )
                })}
            </List>
        </Paper>
        </>
    );
};

export default BlogView;
