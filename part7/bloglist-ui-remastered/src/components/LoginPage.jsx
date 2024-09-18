import { useState } from "react";
import PropTypes from "prop-types";
import Toast from "./Toast";
import loginService from "../services/login";
import { pushNotification } from "../reducers/notificationReducer";

const LoginPage = ({
    setUser,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login(username, password);
            window.localStorage.setItem(
                "loggedInBlogListUser",
                JSON.stringify(user),
            );
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (error) {
            if (error.response.status === 401) {
                pushNotification("Incorrect Credentials", "error")
            } else {
                pushNotification(error.message, "error")
            }
        }
    };

    return (
        <div>
            <Toast />
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username:
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        data-testid="user-field"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>

                <div>
                    Password:
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        data-testid="password-field"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit"> Login </button>
            </form>
        </div>
    );
};

LoginPage.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default LoginPage;
