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
    primary: "#dc2626", // rojo principal
    secondary: "#b91c1c", // rojo oscuro
    accent: "#ef4444", // rojo claro
    background: "#ffffff", // blanco
    surface: "#f9fafb", // gris muy claro
    text: "#000000", // negro
    textSecondary: "#374151", // gris oscuro
    border: "#e5e7eb", // gris claro
  },
  "dark": {
    primary: "#dc2626", // rojo principal
    secondary: "#ef4444", // rojo claro
    accent: "#f87171", // rojo brillante
    background: "#000000", // negro
    surface: "#111111", // negro ligeramente más claro
    text: "#ffffff", // blanco
    textSecondary: "#d1d5db", // gris claro
    border: "#374151", // gris oscuro
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
