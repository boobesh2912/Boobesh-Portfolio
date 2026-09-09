"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => undefined });

export const useTheme = () => useContext(ThemeContext);

export const THEME_KEY = "boobesh-theme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // Light is the default. The inline script in the document head has already
  // applied the stored choice before paint, so we only read it back here.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing once with what the pre-paint script already set
      setTheme("dark");
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // private mode, not worth failing over
      }
      return next;
    });
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
