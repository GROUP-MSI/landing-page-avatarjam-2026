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
      className="w-full transition-all duration-300"
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
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={logo}
                  alt="THE MSI VIP Logo"
                  className="h-12 w-auto object-contain relative z-10"
                />
                <div
                  className="absolute inset-0 blur-lg opacity-30"
                  style={{ backgroundColor: currentTheme.primary }}
                />
              </div>
              <span
                className="text-xl font-bold"
                style={{ color: currentTheme.primary }}
              >
                THE MSI VIP
              </span>
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ color: currentTheme.textSecondary }}
            >
              Convertimos tu negocio de atención al cliente en una experiencia
              inteligente y cobros QR automatizados. Innovación y tecnología al
              servicio de tu empresa.
            </p>

            {/* Math Formula Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: currentTheme.background,
                borderLeft: `3px solid ${currentTheme.primary}`,
                color: currentTheme.primary,
              }}
            >
              <span className="font-bold">ƒ(x)</span>
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
                className="text-lg font-semibold mb-4 pb-2 border-b inline-block"
                style={{
                  color: currentTheme.text,
                  borderBottomColor: currentTheme.primary,
                }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="group flex items-center gap-2 text-sm transition-all duration-200"
                      style={{ color: currentTheme.textSecondary }}
                    >
                      <ChevronRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: currentTheme.primary }}
                      />
                      <span
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
