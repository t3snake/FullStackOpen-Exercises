import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import BlogPage from "./components/BlogPage";
import UsersView from "./components/UsersView";
import UserView from "./components/UserView";
import LoginPage from "./components/LoginPage";
import Toast from "./components/Toast";

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

    const logout = () => {
        window.localStorage.removeItem("loggedInBlogListUser");
        dispatch(logoutUser())
    };

    if (user === null) {
        return <LoginPage />;
    }

    return (
        <Router>
             <p>
                {user.name} logged in
                <button onClick={logout}>Logout</button>
            </p>

            <Toast />
            <Routes>
                <Route path="/" element={<BlogPage />} />
                <Route path="/users" element={<UsersView />} />
                <Route path="/users/:id" element={<UserView />} />
            </Routes>
        </Router>
    )
};

export default App;
