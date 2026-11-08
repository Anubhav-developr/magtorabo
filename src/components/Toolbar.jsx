import { useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nProvider.jsx";

// Theme + language toggle (aapke app.js ke #theme / #language buttons)
export default function Toolbar() {
  const { lang, setLang, t } = useI18n();
  const [theme, setTheme] = useState(() => (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return (
    <div className="toolbar">
      <button id="theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? t("light") : t("dark")}</button>
      <button id="language" onClick={() => setLang(lang === "hi" ? "en" : "hi")}>{t("langBtn")}</button>
    </div>
  );
}
