import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { I18N } from "./strings.js";

// Aapke i18n.js ke `lang / t / setLang` ka React version
const Ctx = createContext(null);

export function I18nProvider({ children, initial = "hi" }) {
  const [lang, setLangState] = useState(initial);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = useCallback((l) => setLangState(l), []);
  const t = useCallback((k) => I18N[lang][k] ?? k, [lang]);
  const value = useMemo(() => ({ lang, setLang, t, locale: lang === "hi" ? "hi-IN" : "en-IN" }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
