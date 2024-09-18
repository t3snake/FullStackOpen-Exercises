import { useSelector } from "react-redux";

const Toast = () => {
    const notifications = useSelector((state) => state.notifications);

    const errorStyle = {
        color: "#db0000",
        backgroundColor: "#fff2f2",
        border: "3px solid #fce1e1",
        borderRadius: "45px",
        padding: "30px",
        fontSize: "20px",
        textAlign: "center",
        width: "calc(100% / 3)",
    };

    const successStyle = {
        color: "#27956e",
        backgroundColor: "#e8f8f2",
        border: "3px solid #d5efe5",
        borderRadius: "45px",
        padding: "30px",
        fontSize: "20px",
        textAlign: "center",
        width: "calc(100% / 3)",
    };

    return (
        <>
            {notifications.map((notification) => {
                const notificationStyle = notification.type === "Error" ? errorStyle : successStyle
                return (
                    <div key={notification.id} style={notificationStyle}>
                        {notification.message}
                    </div>
                )
            } )}
        </>
    );
};

export default Toast;
