// components/Footer.tsx (Versión Premium)
import { MapPin, Phone, Globe, Mail, ChevronRight } from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTheme, themes } from "../context/ThemeContext";

export default function Footer() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const year = new Date().getFullYear();

  const footerSections = [
    {
      title: "Nosotros",
      links: [
        { name: "Nosotros", path: "/home/about" },
        { name: "Misión", path: "/home/mission" },
        { name: "Visión", path: "/home/vision" },
      ],
    },
    {
      title: "Servicios",
      links: [
        { name: "Planes", path: "/home/plans" },
        { name: "Tutorial", path: "/home/tutorial" },
        { name: "Blog", path: "/home/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Términos", path: "/terms" },
        { name: "Privacidad", path: "/privacy" },
        { name: "Cookies", path: "/cookies" },
      ],
    },
  ];

  return (
    <footer
      className="w-full transition-all duration-300 font-sans"
      style={{
        backgroundColor: currentTheme.surface,
        borderTop: `1px solid ${currentTheme.border}`,
        color: currentTheme.text,
      }}
    >
      {/* Main Footer Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column - spans 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="relative">
                <img
                  src={logo}
                  alt="THE MSI VIP Logo"
                  className="h-12 w-auto object-contain relative z-10"
                />
                <div
                  className="absolute inset-0 blur-lg opacity-40"
                  style={{ backgroundColor: currentTheme.primary }}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-display font-black text-lg tracking-wider uppercase leading-none"
                  style={{ color: currentTheme.text }}
                >
                  THE <span style={{ color: currentTheme.primary }}>MSI VIP</span>
                </span>
                <span className="text-[10px] text-gta-pink tracking-[0.25em] font-bold uppercase leading-none mt-1">
                  CRISIS ESTADO
                </span>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ color: currentTheme.textSecondary }}
            >
              Convertimos tu negocio de atención al cliente en una experiencia
              inteligente y cobros QR automatizados. Innovación y tecnología al
              servicio de tu empresa.
            </p>

            {/* Math Formula Badge - Hologram glow */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-none font-mono text-xs transition-all duration-300 hover:scale-105 border border-white/5 shadow-lg shadow-black/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              style={{
                backgroundColor: currentTheme.background,
                borderLeft: `3px solid ${currentTheme.accent}`,
                color: currentTheme.accent,
              }}
            >
              <span className="font-bold gta-text-glow-cyan animate-pulse">ƒ(x)</span>
              <span>= argmax</span>
              <sub>θ</sub>
              <span>𝔼[R | π</span>
              <sub>θ</sub>
              <span>]</span>
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3
                className="font-display font-bold uppercase tracking-widest text-xs mb-5 pb-2 border-b inline-block"
                style={{
                  color: currentTheme.text,
                  borderBottomColor: currentTheme.primary,
                }}
              >
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="group flex items-center gap-2 text-sm transition-all duration-200 cursor-pointer"
                      style={{ color: currentTheme.textSecondary }}
                    >
                      <ChevronRight
                        size={12}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: currentTheme.primary }}
                      />
                      <span
                        className="font-display font-bold uppercase tracking-widest text-[10px]"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = currentTheme.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            currentTheme.textSecondary;
                        }}
                      >
                        {link.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information Row */}
        <div
          className="mt-10 pt-8 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ borderTopColor: currentTheme.border }}
        >
          <div className="flex items-center space-x-3 text-sm">
            <MapPin size={16} style={{ color: currentTheme.primary }} />
            <span style={{ color: currentTheme.textSecondary }}>
              Bolivia, La Paz
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Phone size={16} style={{ color: currentTheme.primary }} />
            <span style={{ color: currentTheme.textSecondary }}>
              +591 788-24-516
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Mail size={16} style={{ color: currentTheme.primary }} />
            <span style={{ color: currentTheme.textSecondary }}>
              info@whatelbot.com
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Globe size={16} style={{ color: currentTheme.primary }} />
            <span style={{ color: currentTheme.textSecondary }}>
              www.whatelbot.com
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTopColor: currentTheme.border }}
        >
          <span
            className="text-xs"
            style={{ color: currentTheme.textSecondary }}
          >
            © {year} THE MSI VIP. Todos los derechos reservados.
          </span>

          <div className="flex gap-6">
            <button
              onClick={() => navigate("/terms")}
              className="text-xs transition-all duration-200 hover:scale-105"
              style={{ color: currentTheme.textSecondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = currentTheme.textSecondary;
              }}
            >
              Términos y Condiciones
            </button>
            <button
              onClick={() => navigate("/privacy")}
              className="text-xs transition-all duration-200 hover:scale-105"
              style={{ color: currentTheme.textSecondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = currentTheme.textSecondary;
              }}
            >
              Política de Privacidad
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
