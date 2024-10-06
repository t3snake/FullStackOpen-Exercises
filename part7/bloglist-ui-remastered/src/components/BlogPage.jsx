import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

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
            <Button variant="contained" color="secondary" onClick={toggleVisibilityCreate} sx={{my:2}}>
                {toggleButtonText()}
            </Button>

            <Typography variant="h3"> Blogs </Typography>
            <TableContainer component={Paper} sx={{my:2}}>
                <Table>
                    <TableBody>
                        {blogs
                            .toSorted((blog1, blog2) => {
                                return blog2.likes - blog1.likes;
                            })
                            .map((blog) => ( 
                                <TableRow  key={blog.id}>
                                    <TableCell>
                                        <Link to={`/blogs/${blog.id}`}>
                                            {blog.title}
                                        </Link> 
                                    </TableCell>
                                    <TableCell>
                                        {blog.author}
                                    </TableCell>
                                </TableRow>)
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BlogPage;
