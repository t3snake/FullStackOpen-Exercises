import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import Container from '@mui/material/Container'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography";

import BlogPage from "./components/BlogPage";
import BlogView from "./components/BlogView";
import UsersView from "./components/UsersView";
import UserView from "./components/UserView";
import LoginPage from "./components/LoginPage";
import Toast from "./components/Toast";


import { initializeBlogs } from "./reducers/blogReducer";
import { loginUser, logoutUser } from "./reducers/userReducer";


const App = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(
            "loggedInBlogListUser",
        );
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(loginUser(user))
        }
    }, []);

    useEffect(() => {
        dispatch(initializeBlogs())
    }, []);


    const logout = () => {
        window.localStorage.removeItem("loggedInBlogListUser");
        dispatch(logoutUser())
    };

    if (user === null) {
        return (
            <Container>
                <LoginPage />
            </Container>
        );
    }

    return (
        <Container>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/">
                            Blogs
                        </Button>
                        <Button color="inherit" component={Link} to="/users">
                            Users
                        </Button>
                        <Stack direction='row' sx={{marginLeft: "auto"}}>
                            <Typography sx={{my: 'auto', mx: 2}} color="tertiary">{user.name} logged in</Typography>
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        </Stack>
                    </Toolbar>
                </AppBar>

                <Toast />
                <Routes>
                    <Route path="/" element={ <BlogPage /> } />
                    <Route path="/blogs/:id" element={ <BlogView /> } />
                    <Route path="/users" element={ <UsersView /> } />
                    <Route path="/users/:id" element={ <UserView /> } />
                </Routes>
            </Router>
        </Container>
    )
};

export default App;
