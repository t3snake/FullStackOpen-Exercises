import { useSelector } from "react-redux";

import Alert from '@mui/material/Alert';


const Toast = () => {
    const notifications = useSelector((state) => state.notifications);

    return (
        <>
            {notifications.map((notification) => {
                const notificationSeverity = notification.type === "Error" ? "error" : "success"
                return (
                    <Alert key={notification.id} severity={notificationSeverity}>
                        {notification.message}
                    </Alert>
                )
            } )}
        </>
    );
};

export default Toast;
