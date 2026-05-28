import { useTheme, themes } from "../context/ThemeContext";
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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
      tag: "AGENTE 3D",
    },
    {
      name: "Wilmer Cruz",
      email: "lpze.wilmer.cruz.ar@unifranz.edu.bo",
      tag: "AGENTE UI",
    },
    {
      name: "Luis Diego Blanco",
      email: "lpze.luisdiego.blanco.hu@unifranz.edu.bo",
      tag: "AGENTE DEV",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: c.background,
        color: c.text,
      }}
      className="min-h-screen relative overflow-hidden pb-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,42,133,0.12)_0%,transparent_50%),radial-gradient(circle_at_bottom,rgba(0,240,255,0.06)_0%,transparent_60%)] pointer-events-none z-0" />
      <div className="absolute inset-0 gta-grid-bg opacity-[0.3] z-0" />

      {/* Header */}
      <div
        className="relative px-6 py-24 text-center border-b border-white/5"
        style={{
          background: `linear-gradient(180deg, ${c.surface} 0%, transparent 100%)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 border border-gta-cyan/30 bg-gta-cyan/10 text-gta-cyan text-[10px] font-display font-black tracking-[0.3em] uppercase mb-6 gta-card-skew"
        >
          <span className="gta-card-skew-inner flex items-center gap-1.5">
            <ShieldAlert size={12} className="animate-pulse" /> TERMINAL DE ENLACE // ENCRIPTADO ESTATAL
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-display font-black uppercase tracking-wider leading-none"
        >
          ENVIAR <span className="bg-gradient-to-r from-gta-pink via-gta-orange to-gta-yellow bg-clip-text text-transparent gta-text-glow-pink">REPORTE</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl mx-auto text-base md:text-lg font-serif italic text-slate-400 mt-6 leading-relaxed"
        >
          ¿Tienes sugerencias tácticas o reportes del simulador? Contáctanos de forma segura.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 relative z-10">
        
        {/* Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-display font-black uppercase tracking-wide text-white">
            Gabinete de <span className="text-gta-pink">Comunicaciones</span>
          </h2>

          {/* Miembros */}
          <div className="space-y-4">
            {contacts.map((ct) => (
              <div
                key={ct.email}
                className="p-5 border bg-zinc-950/60 border-white/5 hover:border-gta-cyan/35 transition-all gta-card-skew group"
              >
                <div className="gta-card-skew-inner flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[8px] tracking-[0.25em] text-slate-500 font-bold uppercase">
                      {ct.tag}
                    </span>
                    <h3 className="font-display font-black text-base uppercase text-white mt-1 group-hover:text-gta-cyan transition-colors">
                      {ct.name}
                    </h3>
                    <a
                      href={`mailto:${ct.email}`}
                      className="flex items-center gap-1.5 text-xs font-mono tracking-wide text-gta-pink mt-2 hover:opacity-75 transition-opacity"
                    >
                      <Mail size={12} />
                      {ct.email}
                    </a>
                  </div>
                  
                  <span className="font-mono text-[9px] tracking-widest text-gta-cyan font-black border border-gta-cyan/20 px-2 py-1 bg-gta-cyan/5">
                    ONLINE
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Teléfono */}
          <div className="p-4 border bg-zinc-950/40 border-white/5 flex items-center gap-4">
            <div
              className="p-3 border border-gta-cyan/20 bg-gta-cyan/5 text-gta-cyan shrink-0"
            >
              <Phone size={20} />
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">
                ENLACE ENCRIPTADO
              </div>
              <div className="font-display font-black text-base text-white tracking-wider mt-0.5">
                +591 788-24-516
              </div>
            </div>
          </div>

          {/* Universidad */}
          <div className="p-4 border bg-zinc-950/40 border-white/5 flex items-center gap-4">
            <div
              className="p-3 border border-gta-pink/20 bg-gta-pink/5 text-gta-pink shrink-0"
            >
              <MapPin size={20} />
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">
                UBICACIÓN CENTRAL
              </div>
              <div className="font-display font-black text-sm text-white tracking-wider mt-0.5 uppercase">
                Universidad Franz Tamayo (Unifranz)
              </div>
              <div className="font-serif italic text-xs text-slate-400">
                La Paz, Bolivia
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div>
          <h2 className="text-2xl font-display font-black uppercase tracking-wide text-white mb-8">
            Establecer <span className="text-gta-cyan">Transmisión</span>
          </h2>

          {sent ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 text-center border border-gta-cyan bg-gta-cyan/5 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)] gta-card-skew"
            >
              <div className="gta-card-skew-inner">
                <div className="text-5xl mb-4 animate-bounce">📡</div>
                <div className="font-display font-black text-xl text-white uppercase tracking-wider">
                  ¡TRANSMISIÓN EXITOSA!
                </div>
                <p className="text-xs font-serif italic text-slate-400 mt-3 leading-relaxed">
                  El reporte ha sido procesado de forma confidencial. El gabinete de crisis revisará los datos.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-5">
              {[
                { id: "name", label: "Identificación / Nombre completo", type: "input", icon: "👤" },
                { id: "email", label: "Canal de Retorno / Correo electrónico", type: "input", icon: "📧" },
                { id: "msg", label: "Cuerpo de Reporte / Mensaje", type: "textarea", icon: "📝" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block font-mono text-[9px] tracking-widest text-slate-500 uppercase mb-2 font-bold">
                    {field.icon} {field.label}
                  </label>
                  
                  {field.type === "input" ? (
                    <input
                      name={field.id}
                      value={form[field.id as keyof typeof form]}
                      onChange={handle}
                      className="w-full px-4 py-3.5 text-xs outline-none bg-zinc-950/70 border border-white/10 text-white font-mono tracking-wide transition-all focus:border-gta-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif"
                      }}
                    />
                  ) : (
                    <textarea
                      name={field.id}
                      value={form[field.id as keyof typeof form]}
                      onChange={handle}
                      rows={5}
                      className="w-full px-4 py-3.5 text-xs outline-none bg-zinc-950/70 border border-white/10 text-white font-mono tracking-wide transition-all resize-none focus:border-gta-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                      style={{
                        fontFamily: "'Source Serif 4', serif"
                      }}
                    />
                  )}
                </div>
              ))}

              <button
                onClick={submit}
                className="w-full py-4.5 font-display font-black text-xs uppercase tracking-[0.25em] bg-gta-pink text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-gta-pink/20 hover:shadow-gta-pink/35 border border-gta-pink flex items-center justify-center gap-3 relative overflow-hidden"
              >
                <Send size={15} />
                INICIAR TRANSMISIÓN SATECO
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
