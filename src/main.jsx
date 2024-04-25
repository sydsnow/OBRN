import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routers/AppRouter.jsx";
import "./scss/styles.scss";
import Modal from 'react-modal';

// Set the app element for react-modal
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
