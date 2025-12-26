import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouterApp from "./routers/RouterApp";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  </React.StrictMode>
);
