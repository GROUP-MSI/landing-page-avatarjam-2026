import { useTheme, themes } from "../context/ThemeContext";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const { theme } = useTheme();
  const c = themes[theme];

  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (form.name && form.email && form.msg) {
      setSent(true);
    }
  };

  const contacts = [
    {
      name: "Deynar Luis Calle",
      email: "lpze.deynarluis.calle.la@unifranz.edu.bo",
    },
    {
      name: "Wilmer Cruz",
      email: "lpze.wilmer.cruz.ar@unifranz.edu.bo",
    },
    {
      name: "Luis Diego Blanco",
      email: "lpze.luisdiego.blanco.hu@unifranz.edu.bo",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: c.background,
        color: c.text,
        fontFamily: "'Oswald', sans-serif",
      }}
      className="min-h-screen"
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');`}</style>

      {/* Header */}
      <div
        className="px-6 py-16 text-center"
        style={{
          borderBottom: `2px solid ${c.primary}`,
          backgroundColor: c.surface,
        }}
      >
        <div
          className="inline-block px-4 py-1 text-xs font-semibold tracking-widest mb-6 uppercase"
          style={{ backgroundColor: c.primary, color: "#fff" }}
        >
          Unifranz Bolivia
        </div>
        <h1 className="text-5xl font-black uppercase" style={{ color: c.text }}>
          CON<span style={{ color: c.primary }}>TACTO</span>
        </h1>
        <p
          className="mt-4 text-lg max-w-xl mx-auto"
          style={{
            color: c.textSecondary,
            fontFamily: "'Source Serif 4', serif",
            fontStyle: "italic",
          }}
        >
          ¿Preguntas sobre el proyecto? Escríbenos.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-8">
          <h2
            className="text-2xl font-bold uppercase tracking-widest"
            style={{ color: c.text }}
          >
            Equipo del <span style={{ color: c.primary }}>proyecto</span>
          </h2>

          {/* Miembros */}
          <div className="space-y-4">
            {contacts.map((ct) => (
              <div
                key={ct.email}
                className="p-4"
                style={{
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.surface,
                }}
              >
                <div
                  className="font-bold uppercase tracking-wide mb-1"
                  style={{ color: c.text }}
                >
                  {ct.name}
                </div>
                <a
                  href={`mailto:${ct.email}`}
                  className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                  style={{ color: c.primary }}
                >
                  <Mail size={13} />
                  {ct.email}
                </a>
              </div>
            ))}
          </div>

          {/* Teléfono */}
          <div
            className="p-4 flex items-center gap-4"
            style={{
              border: `1px solid ${c.border}`,
              backgroundColor: c.surface,
            }}
          >
            <div
              className="p-3"
              style={{ backgroundColor: `${c.primary}20`, color: c.primary }}
            >
              <Phone size={20} />
            </div>
            <div>
              <div
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: c.textSecondary }}
              >
                Teléfono
              </div>
              <div className="font-bold" style={{ color: c.text }}>
                +591 78824516
              </div>
            </div>
          </div>

          {/* Universidad */}
          <div
            className="p-4 flex items-center gap-4"
            style={{
              border: `1px solid ${c.border}`,
              backgroundColor: c.surface,
            }}
          >
            <div
              className="p-3"
              style={{ backgroundColor: `${c.primary}20`, color: c.primary }}
            >
              <MapPin size={20} />
            </div>
            <div>
              <div
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: c.textSecondary }}
              >
                Universidad
              </div>
              <div className="font-bold" style={{ color: c.text }}>
                Universidad Privada Franz Tamayo
              </div>
              <div className="text-sm" style={{ color: c.textSecondary }}>
                La Paz, Bolivia
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div>
          <h2
            className="text-2xl font-bold uppercase tracking-widest mb-8"
            style={{ color: c.text }}
          >
            Envíanos un <span style={{ color: c.primary }}>mensaje</span>
          </h2>

          {sent ? (
            <div
              className="p-8 text-center"
              style={{
                border: `2px solid ${c.primary}`,
                backgroundColor: c.surface,
              }}
            >
              <div className="text-4xl mb-4">✅</div>
              <div
                className="font-bold text-lg uppercase"
                style={{ color: c.text }}
              >
                ¡Mensaje enviado!
              </div>
              <p className="text-sm mt-2" style={{ color: c.textSecondary }}>
                Te responderemos a la brevedad.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { id: "name", label: "Nombre completo", type: "input" },
                { id: "email", label: "Correo electrónico", type: "input" },
                { id: "msg", label: "Mensaje", type: "textarea" },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    className="block text-xs uppercase tracking-widest mb-2"
                    style={{ color: c.textSecondary }}
                  >
                    {field.label}
                  </label>
                  {field.type === "input" ? (
                    <input
                      name={field.id}
                      value={form[field.id as keyof typeof form]}
                      onChange={handle}
                      className="w-full px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        backgroundColor: c.surface,
                        border: `1px solid ${c.border}`,
                        color: c.text,
                        fontFamily: "'Oswald', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = c.primary)}
                      onBlur={(e) => (e.target.style.borderColor = c.border)}
                    />
                  ) : (
                    <textarea
                      name={field.id}
                      value={form[field.id as keyof typeof form]}
                      onChange={handle}
                      rows={5}
                      className="w-full px-4 py-3 text-sm outline-none resize-none transition-all"
                      style={{
                        backgroundColor: c.surface,
                        border: `1px solid ${c.border}`,
                        color: c.text,
                        fontFamily: "'Source Serif 4', serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = c.primary)}
                      onBlur={(e) => (e.target.style.borderColor = c.border)}
                    />
                  )}
                </div>
              ))}

              <button
                onClick={submit}
                className="w-full py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  backgroundColor: c.primary,
                  color: "#fff",
                  letterSpacing: "0.2em",
                }}
              >
                <Send size={16} />
                Enviar mensaje
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
