"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => undefined });

export const useTheme = () => useContext(ThemeContext);

export const THEME_KEY = "boobesh-theme";

const CHANGE = "boobesh:theme-change";

/* The page itself is the source of truth: the data-theme attribute that the
   pre-paint script (and the toggle) write. Reading it back directly means the
   theme is right on the very first client render, with no light to dark flip. */
const read = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
const subscribe = (cb: () => void) => {
  window.addEventListener(CHANGE, cb);
  return () => window.removeEventListener(CHANGE, cb);
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore<Theme>(subscribe, read, () => "light");

  const toggle = useCallback(() => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // private mode, not worth failing over
    }
    window.dispatchEvent(new Event(CHANGE));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

/*
  Runs before first paint so the page never flashes the wrong theme.
*/
export const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('${THEME_KEY}');
    if (t === 'dark') document.documentElement.setAttribute('data-theme','dark');
  } catch (e) {}
})();
`;
