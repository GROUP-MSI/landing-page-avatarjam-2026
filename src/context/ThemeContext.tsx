// contexts/ThemeContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = {
  "light": {
    primary: "#ff2a85", // rosa neón principal
    secondary: "#ff6b00", // naranja sunset
    accent: "#00f0ff", // cian brillante
    background: "#f8fafc", // pizarra muy claro
    surface: "#ffffff", // blanco puro
    text: "#0f172a", // pizarra oscuro
    textSecondary: "#475569", // pizarra medio
    border: "#cbd5e1", // pizarra claro
  },
  "dark": {
    primary: "#ff2a85", // rosa neón principal
    secondary: "#ff6b00", // naranja sunset
    accent: "#00f0ff", // cian brillante
    background: "#030306", // negro obsidiana
    surface: "#0d0d14", // pizarra oscuro/slate de juego
    text: "#ffffff", // blanco
    textSecondary: "#94a3b8", // gris pizarra claro
    border: "#1f1f2e", // borde pizarra oscuro
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    const colors = themes[theme];

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
