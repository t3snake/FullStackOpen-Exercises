import { useEffect } from "react";
import BlogPage from "./components/BlogPage";
import LoginPage from "./components/LoginPage";

import { loginUser } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

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

    if (user === null) {
        return <LoginPage />;
    }

    return <BlogPage />;
};

export default App;
