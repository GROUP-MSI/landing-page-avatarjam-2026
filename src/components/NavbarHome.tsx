// components/NavbarHome.tsx (Versión mejorada con Tailwind custom breakpoint)
import { useState, useEffect } from "react";
import { themes, useTheme, type Theme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Inicio", href: "/home" },
  { name: "Nosotros", href: "/home/about" },
  { name: "Planes", href: "/home/plans" },
  { name: "Tutorial", href: "/home/tutorial" },
  { name: "Blog", href: "/home/blog" },
  { name: "Contactanos", href: "/home/contact" },
];

const themeOptions: { name: string; value: Theme; icon: string }[] = [
  { name: "Verde Claro", value: "light", icon: "🌿" },
  { name: "Verde Oscuro", value: "dark", icon: "🌲" },
];

export const NavbarHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentThemeColors = themes[theme];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
      style={{
        backgroundColor: currentThemeColors.surface,
        borderBottom: `1px solid ${currentThemeColors.border}`,
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center w-[130px] justify-between"
            style={{
              color: currentThemeColors.text,
            }}
          >
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
            <p>
              <b>The Msi</b>
            </p>
          </div>

          {/* Desktop Menu - visible en pantallas >= 1030px */}
          <div className="max-lg:hidden flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className="transition-colors duration-200 font-medium"
                style={{
                  color: currentThemeColors.textSecondary,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = currentThemeColors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    currentThemeColors.textSecondary;
                }}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Buttons - visible en pantallas >= 1030px */}
          <div className="max-lg:hidden flex items-center space-x-4">
            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="p-2 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: currentThemeColors.background,
                  color: currentThemeColors.text,
                }}
              >
                <span className="text-xl">
                  {themeOptions.find((t) => t.value === theme)?.icon || "🎨"}
                </span>
              </button>

              {isThemeOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsThemeOpen(false)}
                  />
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50"
                    style={{
                      backgroundColor: currentThemeColors.surface,
                      border: `1px solid ${currentThemeColors.border}`,
                    }}
                  >
                    {themeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setTheme(option.value);
                          setIsThemeOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left transition-colors duration-200"
                        style={{
                          color: currentThemeColors.text,
                          backgroundColor:
                            theme === option.value
                              ? currentThemeColors.primary + "20"
                              : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (theme !== option.value) {
                            e.currentTarget.style.backgroundColor =
                              currentThemeColors.background;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (theme !== option.value) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      >
                        <span>{option.icon}</span>
                        <span>{option.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              className="px-4 py-2 rounded-lg transition-all duration-200 font-medium"
              style={{
                backgroundColor: currentThemeColors.primary,
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Iniciar Sesión
            </button>
            <button
              className="px-4 py-2 rounded-lg transition-all duration-200 font-medium"
              style={{
                backgroundColor: "transparent",
                border: `2px solid ${currentThemeColors.primary}`,
                color: currentThemeColors.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  currentThemeColors.primary;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = currentThemeColors.primary;
              }}
            >
              Registro
            </button>
          </div>

          {/* Mobile Menu Button - visible solo en pantallas < 1030px */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: currentThemeColors.text }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - visible solo en pantallas < 1030px */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: currentThemeColors.surface }}
      >
        <div className="px-4 pt-2 pb-4 space-y-3">
          {/* Navigation */}
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.href);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-2 transition-colors duration-200 font-medium"
              style={{
                color: currentThemeColors.textSecondary,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentThemeColors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = currentThemeColors.textSecondary;
              }}
            >
              {item.name}
            </button>
          ))}

          {/* Buttons + Theme */}
          <div
            className="pt-4 space-y-3 border-t"
            style={{ borderColor: currentThemeColors.border }}
          >
            {/* Iniciar sesión */}
            <button
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 rounded-lg transition-all duration-200 font-medium"
              style={{
                backgroundColor: currentThemeColors.primary,
                color: "white",
              }}
            >
              Iniciar Sesión
            </button>

            {/* Registro */}
            <button
              onClick={() => {
                navigate("/register");
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 rounded-lg transition-all duration-200 font-medium"
              style={{
                backgroundColor: "transparent",
                border: `2px solid ${currentThemeColors.primary}`,
                color: currentThemeColors.primary,
              }}
            >
              Registro
            </button>

            {/* Theme selector */}
            <div className="pt-2">
              <p
                className="text-sm mb-2"
                style={{ color: currentThemeColors.textSecondary }}
              >
                Cambiar tema:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTheme(option.value);
                    }}
                    className="px-3 py-2 rounded-lg text-sm transition-colors duration-200"
                    style={{
                      backgroundColor:
                        theme === option.value
                          ? currentThemeColors.primary + "30"
                          : currentThemeColors.background,
                      color: currentThemeColors.text,
                      border:
                        theme === option.value
                          ? `1px solid ${currentThemeColors.primary}`
                          : `1px solid ${currentThemeColors.border}`,
                    }}
                  >
                    {option.icon} {option.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
