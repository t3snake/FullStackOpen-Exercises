import { useState, useEffect } from "react";
import BlogPage from "./components/BlogPage";
import LoginPage from "./components/LoginPage";

const App = () => {
    const [user, setUser] = useState(null);

    const state = {
        user,
        setUser,
    };

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(
            "loggedInBlogListUser",
        );
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    if (user === null) {
        return <LoginPage {...state} />;
    }

    return <BlogPage {...state} />;
};

export default App;
