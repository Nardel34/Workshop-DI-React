import React from "react";
import ReactDOM from "react-dom/client";
import {ToastContainer} from "react-toastify";
import App from "./App.tsx";
import {ServiceProvider} from "./contexts/ServiceContext.tsx";
import "./index.scss";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ServiceProvider>
            <App/>
            <ToastContainer/>
        </ServiceProvider>
    </React.StrictMode>
);