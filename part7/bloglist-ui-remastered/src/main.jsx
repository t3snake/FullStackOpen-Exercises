import ReactDOM from "react-dom/client";
import App from "./App";
import bloglistStore from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={bloglistStore}>
        <App />
    </Provider>
);
