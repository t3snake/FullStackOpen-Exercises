import { useState } from "react";
import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'

import Toast from "./Toast";

import loginService from "../services/login";

import { loginUser, logoutUser } from "../reducers/userReducer";
import { pushNotification } from "../reducers/notificationReducer";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login(username, password);
            window.localStorage.setItem(
                "loggedInBlogListUser",
                JSON.stringify(user),
            );
            dispatch(loginUser(user))
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
        <Box>
            <Toast />
            <Typography variant="h3" sx={{my: 2}}>Log in to application</Typography>
            <form onSubmit={handleLogin}>
                <div>
                    <TextField
                        id="standard-controlled"
                        variant="standard"
                        label="Username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>

                <div>
                    <TextField
                        id="standard-controlled"
                        variant="standard"
                        label="Password"
                        value={password}
                        type="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit" sx={{my: 2}}> Login </Button>
            </form>
        </Box>
    );
};

export default LoginPage;
