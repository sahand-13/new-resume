"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("resume-language");
    if (saved === "fa" || saved === "en") setLanguage(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);
  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("resume-language", nextLanguage);
  };
  const value = useMemo(() => ({ language, direction: language === "fa" ? "rtl" : "ltr", setLanguage: changeLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
