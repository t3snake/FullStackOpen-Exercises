import { useEffect } from "react";

const Toast = ({ message, setMessage, messageType }) => {
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

    const style = messageType === "error" ? errorStyle : successStyle;

    useEffect(() => {
        setTimeout(() => setMessage(""), 3000);
    }, [message, setMessage]);

    return message !== "" && <div style={style}> {message} </div>;
};

export default Toast;
