import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fieldnotes/ui/styles.css";
import { initializePendo } from "./analytics/pendo";
import { App } from "./App";
import { AdminAuthProvider } from "./auth/AdminAuthContext";

initializePendo();

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
