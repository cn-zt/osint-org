// 主题管理：dark / system / light，统一维护 --theme-index 与 data-index
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "osint-theme";
const INDEX = { dark: 0, system: 1, light: 2 };

const ThemeContext = createContext({ theme: "system", setTheme: () => {} });

function systemPrefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolve(theme) {
  if (theme === "system" || !theme) return systemPrefersDark() ? "dark" : "light";
  return theme;
}

function applyDom(theme) {
  const idx = INDEX[theme] ?? 1;
  const root = document.documentElement;
  root.setAttribute("data-theme", resolve(theme));
  root.setAttribute("data-index", String(idx));
  root.style.setProperty("--theme-index", String(idx));
}

function readStored() {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return INDEX[t] != null ? t : "system";
  } catch {
    return "system";
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStored);

  useEffect(() => {
    applyDom(theme);
  }, [theme]);

  // system 模式跟随系统主题变化
  useEffect(() => {
    if (theme !== "system" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyDom("system");
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [theme]);

  const setTheme = useCallback((t) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
