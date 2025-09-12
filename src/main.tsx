import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Use HashRouter for GitHub Pages
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
