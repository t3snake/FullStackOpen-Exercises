import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

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
        return <LoginPage />;
    }

    return (
        <Router>
            <div>
                <span>
                    <Link to={'/'}>blogs </Link>
                    {' '}
                </span>
                <span>
                    <Link to={'/users'}>users {' '}</Link>
                    {' '}
                </span>
                <span>
                    {user.name} logged in
                    <button onClick={logout}>Logout</button>
                </span>
            </div>

            <Toast />
            <Routes>
                <Route path="/" element={ <BlogPage /> } />
                <Route path="/blogs/:id" element={ <BlogView /> } />
                <Route path="/users" element={ <UsersView /> } />
                <Route path="/users/:id" element={ <UserView /> } />
            </Routes>
        </Router>
    )
};

export default App;
