// components/NavbarHome.tsx (Versión mejorada con Tailwind custom breakpoint)
import { useState, useEffect } from "react";
import { themes, useTheme, type Theme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/about" },
  { name: "Planes", href: "/plans" },
  { name: "Tutorial", href: "/tutorial" },
  { name: "Blog", href: "/blog" },
  { name: "Contactanos", href: "/contact" },
];

const themeOptions: { name: string; value: Theme; icon: string }[] = [
  { name: "Bolivia Sol", value: "light", icon: "☀️" },
  { name: "Vice City", value: "dark", icon: "🌆" },
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
        scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md bg-opacity-80" : ""
      }`}
      style={{
        backgroundColor: scrolled && theme === "dark" 
          ? "rgba(13, 13, 20, 0.85)" 
          : scrolled && theme === "light"
          ? "rgba(255, 255, 255, 0.85)"
          : currentThemeColors.surface,
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.06)" : currentThemeColors.border}`,
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand Title */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
            style={{
              color: currentThemeColors.text,
            }}
          >
            <div className="relative">
              <img src={logo} alt="Logo" className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gta-pink blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-sm tracking-wider uppercase leading-none">
                THE MSI VIP
              </span>
              <span className="text-[10px] text-gta-pink tracking-[0.25em] font-bold uppercase leading-none mt-1">
                CRISIS ESTADO
              </span>
            </div>
          </div>

          {/* Desktop Menu - visible en pantallas >= 1030px */}
          <div className="max-lg:hidden flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className="transition-colors duration-200 font-display font-bold uppercase tracking-widest text-[11px] cursor-pointer"
                style={{
                  color: currentThemeColors.textSecondary,
                  background: "transparent",
                  border: "none",
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
          <div className="max-lg:hidden flex items-center space-x-5">
            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="p-2.5 rounded-none border transition-colors duration-200 cursor-pointer"
                style={{
                  backgroundColor: currentThemeColors.background,
                  color: currentThemeColors.text,
                  borderColor: currentThemeColors.border,
                }}
              >
                <span className="text-lg flex items-center justify-center">
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
                    className="absolute right-0 mt-3 w-48 rounded-none shadow-2xl z-50"
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
                        className="flex items-center space-x-3 w-full px-4 py-3 text-left transition-colors duration-200 font-display font-bold uppercase tracking-wider text-xs cursor-pointer"
                        style={{
                          color: currentThemeColors.text,
                          backgroundColor:
                            theme === option.value
                              ? currentThemeColors.primary + "15"
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
              className="px-5 py-2.5 rounded-none font-display font-bold uppercase tracking-widest text-[10px] transition-all duration-200 hover:scale-105 cursor-pointer shadow-lg shadow-gta-pink/10"
              style={{
                backgroundColor: currentThemeColors.primary,
                color: "white",
                border: `1px solid ${currentThemeColors.primary}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = currentThemeColors.primary;
                e.currentTarget.style.boxShadow = `0 0 15px ${currentThemeColors.primary}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = currentThemeColors.primary;
                e.currentTarget.style.color = "white";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Iniciar Sesión
            </button>
            <button
              className="px-5 py-2.5 rounded-none font-display font-bold uppercase tracking-widest text-[10px] transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: "transparent",
                border: `1px solid ${currentThemeColors.text}`,
                color: currentThemeColors.text,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = currentThemeColors.primary;
                e.currentTarget.style.color = currentThemeColors.primary;
                e.currentTarget.style.boxShadow = `0 0 15px ${currentThemeColors.primary}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = currentThemeColors.text;
                e.currentTarget.style.color = currentThemeColors.text;
                e.currentTarget.style.boxShadow = "none";
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
