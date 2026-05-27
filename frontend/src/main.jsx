import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

/* CSS globaux */
import "./index.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/sidebar.css";
import "./styles/dashboard.css";
import "./styles/buttons.css";
import "./styles/forms.css";
import "./styles/cards.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);