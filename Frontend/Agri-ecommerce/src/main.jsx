import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000,
  once: true,
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastContainer
    position ="top-right"
    autoClose={3000}/>
  </BrowserRouter>
);