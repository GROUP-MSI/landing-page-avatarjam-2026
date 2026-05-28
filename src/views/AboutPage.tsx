import { useTheme, themes } from "../context/ThemeContext";
import { Users, Globe, Shield, Calendar, Award, FileText } from "lucide-react";
import { GiMiner, GiRevolver } from "react-icons/gi";
import { FaPersonMilitaryToPerson } from "react-icons/fa6";
import { RiGovernmentLine } from "react-icons/ri";
import { motion } from "framer-motion";

export const AboutPage = () => {
  const { theme } = useTheme();
  const c = themes[theme];

  const timeline = [
    {
      year: "2024",
      title: "Tensión preelectoral",
      desc: "Bolivia enfrenta una profunda fractura en el partido oficialista. La pugna por la candidatura presidencial abre el camino a la inestabilidad social.",
    },
    {
      year: "2024",
      title: "Bloqueos y Movilización",
      desc: "Mineros y Ponchos Rojos paralizan las carreteras estratégicas. El desabastecimiento golpea severamente a las principales capitales.",
    },
    {
      year: "2025",
      title: "Asedio de Gobernabilidad",
      desc: "El Presidente Paz asume el desafío máximo de contener las facciones aliadas y hostiles sin cruzar la línea hacia una guerra civil.",
    },
  ];

  const actors = [
    {
      icon: <RiGovernmentLine size={22} />,
      name: "Presidente Paz",
      rol: "HÉROE / TU ROL",
      color: "#00f0ff",
      desc: "Líder constitucional. Su meta principal es mantener los canales de diálogo abiertos y resistir la presión golpista.",
    },
    {
      icon: <GiRevolver size={22} />,
      name: "Ponchos Rojos",
      rol: "FACCIÓN SINDICAL HOSTIL",
      color: "#ff6b00",
      desc: "Milicia leal a Evo Morales. Movilizados permanentemente, lideran bloqueos duros en los accesos al altiplano boliviano.",
    },
    {
      icon: <GiMiner size={22} />,
      name: "Mineros Cooperativistas",
      rol: "SINDICATO HOSTIL",
      color: "#ff6b00",
      desc: "Bloquean rutas troncales con detonaciones. Tienen alta capacidad de estrangular la economía a menos que obtengan concesiones.",
    },
    {
      icon: <Globe size={22} />,
      name: "Evo Morales",
      rol: "ANTAGONISTA PRINCIPAL",
      color: "#ff2a85",
      desc: "Líder de la oposición. Orquesta y coordina la rebelión social desde el trópico de Cochabamba para forzar la renuncia de Paz.",
    },
    {
      icon: <Users size={22} />,
      name: "El Pueblo Civil",
      rol: "NEUTRO / VÍCTIMA",
      color: "#facc15",
      desc: "Ciudadanos atrapados en el fuego cruzado. Si el conflicto se extiende o hay represión brutal, se unen a las protestas masivas.",
    },
    {
      icon: <FaPersonMilitaryToPerson size={22} />,
      name: "Militares y Policías",
      rol: "FUERZA ESTATAL DE DEFENSA",
      color: "#00f0ff",
      desc: "Tu único escudo para mantener el orden. Si su moral decae o pierden sus comisarias, el Palacio Quemado sucumbe de inmediato.",
    },
  ];

  const team = [
    { name: "Deynar Luis Calle", role: "Modelador 3D / Desarrollador", tag: "AGENTE 01" },
    { name: "Wilmer Cruz", role: "Diseñador Visual / Desarrollador", tag: "AGENTE 02" },
    { name: "Luis Diego Blanco", role: "Programador de Motor / Sistemas", tag: "AGENTE 03" },
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

      {/* Hero / Header */}
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
            <FileText size={12} /> EXPEDIENTE CONFIDENCIAL // DOSSIER DE PROYECTO
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-wider leading-none"
        >
          CRISIS <span className="bg-gradient-to-r from-gta-pink via-gta-orange to-gta-yellow bg-clip-text text-transparent gta-text-glow-pink">ESTADO</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl mx-auto text-base md:text-lg font-serif italic text-slate-400 mt-6 leading-relaxed"
        >
          Una simulación interactiva universitaria de toma de decisiones gubernamentales inspirada en la coyuntura y gobernabilidad boliviana.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 space-y-24 relative z-10">
        
        {/* Qué es */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="font-display font-black text-xs tracking-[0.25em] text-gta-pink uppercase">
              PROPÓSITO DEL JUEGO
            </span>
            <h2 className="text-3xl font-display font-black uppercase text-white mt-1 mb-6">
              ¿Qué es <span className="text-gta-pink">Crisis Estado</span>?
            </h2>
            <div className="space-y-4 font-serif italic text-slate-400 leading-relaxed text-sm md:text-base">
              <p>
                Crisis Estado es una plataforma gamificada interactiva y educativa que modela matemáticamente los hilos invisibles detrás de la gobernabilidad democrática de Bolivia durante los periodos de extrema tensión.
              </p>
              <p>
                El juego pone a prueba tu temple político: te obliga a balancear el descontento de múltiples facciones en huelga con el uso regulado de la fuerza pública, demostrando las consecuencias sociológicas de cada comando emitido.
              </p>
            </div>
          </div>
          <div className="p-8 border border-white/5 bg-zinc-950/70 backdrop-blur-md gta-card-skew hover:border-gta-pink/20 transition-all">
            <div className="gta-card-skew-inner flex flex-col gap-4 text-center py-6">
              <Award size={48} className="text-gta-pink mx-auto animate-pulse" />
              <div className="font-display font-black text-xl text-white uppercase tracking-wider">
                MÁS QUE UNA LANDING
              </div>
              <p className="font-serif italic text-xs text-slate-500 leading-relaxed">
                Integra modelado 3D de personajes emblemáticos de la política boliviana y un simulador de algoritmos de estado en tiempo real.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contexto histórico */}
        <section>
          <div className="text-center mb-12">
            <span className="font-display font-black text-xs tracking-[0.25em] text-gta-cyan uppercase">
              CRONOLOGÍA DE LA CRISIS
            </span>
            <h2 className="text-3xl font-display font-black uppercase text-white mt-1">
              Contexto <span className="text-gta-cyan">Histórico</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 border bg-zinc-950/40 border-white/5 hover:border-gta-cyan/30 transition-all gta-card-skew group"
              >
                <div className="gta-card-skew-inner">
                  <div className="flex items-center gap-2 font-mono text-xs font-black tracking-widest text-gta-cyan mb-3">
                    <Calendar size={14} className="animate-pulse" /> {item.year} // ETAPA 0{idx + 1}
                  </div>
                  <h3 className="font-display font-black text-lg uppercase text-white mb-3 group-hover:text-gta-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-serif italic text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Los 6 actores */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <span className="font-display font-black text-xs tracking-[0.25em] text-gta-pink uppercase">
              ACTORES DEL TABLERO
            </span>
            <h2 className="text-3xl font-display font-black uppercase text-white mt-1">
              Facciones en <span className="text-gta-pink">Conflicto</span>
            </h2>
          </div>

          <div className="space-y-4">
            {actors.map((actor, idx) => (
              <motion.div
                key={actor.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex items-center gap-5 p-5 border bg-zinc-950/60 border-white/5 hover:border-white/10 transition-all group"
              >
                <div
                  className="p-3.5 border shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${actor.color}15`,
                    borderColor: `${actor.color}30`,
                    color: actor.color,
                  }}
                >
                  {actor.icon}
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display font-black text-lg uppercase tracking-wide text-white">
                      {actor.name}
                    </h3>
                    <span
                      className="font-mono text-[9px] tracking-[0.2em] font-black uppercase"
                      style={{ color: actor.color }}
                    >
                      {actor.rol}
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-slate-400 leading-relaxed mt-1">
                    {actor.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Equipo */}
        <section className="space-y-12">
          <div className="text-center mb-12">
            <span className="font-display font-black text-xs tracking-[0.25em] text-gta-cyan uppercase">
              CUPO DE DESARROLLO
            </span>
            <h2 className="text-3xl font-display font-black uppercase text-white mt-1">
              Fuerza de <span className="text-gta-cyan">Trabajo</span>
            </h2>
            <p className="font-serif italic text-slate-400 mt-2 text-sm">
              Estudiantes de la Universidad Privada Franz Tamayo (Unifranz), La Paz, Bolivia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((m, idx) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 text-center border bg-zinc-950/60 border-white/5 hover:border-gta-cyan/35 shadow-2xl gta-card-skew transition-all group"
              >
                <div className="gta-card-skew-inner">
                  {/* Holographic profile tag */}
                  <div
                    className="w-16 h-16 mx-auto mb-6 border flex items-center justify-center font-display font-black text-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundColor: `${c.primary}10`,
                      borderColor: c.primary,
                      color: c.primary,
                      boxShadow: `0 0 15px ${c.primary}20`
                    }}
                  >
                    {/* Glowing effect inside tag */}
                    <div className="absolute inset-0 bg-gta-pink/5 animate-pulse" />
                    {m.name.charAt(0)}
                  </div>
                  
                  <div className="font-mono text-[9px] tracking-widest text-slate-500 font-bold uppercase">
                    {m.tag}
                  </div>
                  
                  <h3 className="font-display font-black text-lg uppercase tracking-wide text-white mt-2 group-hover:text-gta-cyan transition-colors">
                    {m.name}
                  </h3>
                  
                  <div className="font-serif italic text-xs text-slate-400 mt-1">
                    {m.role}
                  </div>
                  
                  <div className="font-mono text-[9px] tracking-wider text-gta-cyan uppercase mt-6 border-t border-white/5 pt-4">
                    UNIFRANZ BOLIVIA
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
