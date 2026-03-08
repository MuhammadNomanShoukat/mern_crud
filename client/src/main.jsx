import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer, toast } from 'react-toastify';
import { ContextProvider } from "./store/auth.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <StrictMode>
      <App />
      <ToastContainer />  
    </StrictMode>
  </ContextProvider>,
);
