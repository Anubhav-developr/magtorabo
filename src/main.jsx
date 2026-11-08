import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { I18nProvider } from "./i18n/I18nProvider.jsx";
import "./styles.css";
import "./extra.css";

createRoot(document.getElementById("root")).render(
  <I18nProvider initial="hi">
    <App />
  </I18nProvider>
);
