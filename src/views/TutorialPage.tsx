import { useTheme, themes } from "../context/ThemeContext";
import {
  Shield,
  Skull,
  Users,
  Zap,
  TrendingUp,
  ChevronRight,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import { GiMiner, GiRevolver } from "react-icons/gi";
import { FaPersonMilitaryToPerson } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function TutorialPage() {
  const { theme } = useTheme();
  const c = themes[theme];
  const navigate = useNavigate();

  const steps = [
    {
      num: "01",
      title: "El Escenario de Asedio",
      icon: <Zap size={22} />,
      content:
        "Asumes la presidencia en medio de un conflicto armado civil. Facciones rebeldes lideradas por Evo Morales cierran el cerco sobre el Palacio Quemado. Tienes 5 minutos exactos para resistir y restaurar el orden.",
    },
    {
      num: "02",
      title: "Estabilidad del Estado",
      icon: <Shield size={22} />,
      content:
        "Este es tu medidor cardíaco. Si llega a 0%, el gobierno constitucional cae derrocado. Disminuye con disturbios no contenidos, deserción de las fuerzas del orden o una represión desmedida que enfurezca a los civiles.",
    },
    {
      num: "03",
      title: "Las Facciones Altiplánicas",
      icon: <GiRevolver size={22} />,
      content:
        "Ponchos Rojos y Mineros inician bloqueos y suben de intensidad cada segundo. Si superan el 70% de control, destruyen tu estabilidad. Puedes repelerlos temporalmente con diálogo o despliegue militar.",
    },
    {
      num: "04",
      title: "El Descontento de las Calles",
      icon: <Users size={22} />,
      content:
        "El enojo ciudadano es tu golpe final. Si los bloqueos paralizan el país o respondes con represión desmedida (Fuerza Bruta), los civiles se levantarán. Un enojo superior al 95% causará un derrocamiento automático.",
    },
    {
      num: "05",
      title: "Las Fuerzas Armadas y Policía",
      icon: <FaPersonMilitaryToPerson size={22} />,
      content:
        "Son tu único escudo protector. Si las estaciones policiales son destruidas o la moral cae a 0%, pierdes de inmediato. Llama refuerzos tácticos preventivamente antes de perder el control.",
    },
    {
      num: "06",
      title: "Consola de Decisiones",
      icon: <TrendingUp size={22} />,
      content:
        "Dispones de 6 comandos tácticos en tiempo real. Cada uno modifica múltiples variables socio-políticas a la vez. No hay decisiones ideales: solo la búsqueda constante del equilibrio.",
    },
  ];

  const actions = [
    {
      label: "Diálogo Nacional",
      effect: "+9% Estabilidad, -6% Facciones",
      risk: "MÍNIMO",
      icon: <Users size={16} />,
    },
    {
      label: "Fuerza Moderada",
      effect: "-11% Ponchos/Mineros, +4% Civiles",
      risk: "MEDIO",
      icon: <Shield size={16} />,
    },
    {
      label: "Fuerza Bruta Militar ⚠️",
      effect: "-28% Hostiles, ++Caos Civil, Incendios",
      risk: "EXTREMO",
      icon: <Skull size={16} />,
    },
    {
      label: "Negociar con Mineros",
      effect: "-17% Mineros, +6% Estabilidad",
      risk: "MÍNIMO",
      icon: <GiMiner size={16} />,
    },
    {
      label: "Refuerzos Militares",
      effect: "+18% Defensa, +6% Estabilidad",
      risk: "MÍNIMO",
      icon: <FaPersonMilitaryToPerson size={16} />,
    },
    {
      label: "Cadena Nacional",
      effect: "-22% Enojo Civil",
      risk: "MÍNIMO",
      icon: <Zap size={16} />,
    },
  ];

  const riskColor = (r: string) =>
    r === "MÍNIMO" ? "#00f0ff" : r === "MEDIO" ? "#facc15" : c.primary;

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
          className="inline-flex items-center gap-2 px-4 py-1 border border-gta-pink/30 bg-gta-pink/10 text-gta-pink text-[10px] font-display font-black tracking-[0.3em] uppercase mb-6 gta-card-skew"
        >
          <span className="gta-card-skew-inner flex items-center gap-1.5">
            <HelpCircle size={12} /> MANUAL DE OPERACIONES TÁCTICAS // PROTOCOLOS
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-display font-black uppercase tracking-wider leading-none"
        >
          CÓMO <span className="bg-gradient-to-r from-gta-pink to-gta-orange bg-clip-text text-transparent">SOBREVIVIR</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl mx-auto text-base md:text-lg font-serif italic text-slate-400 mt-6 leading-relaxed"
        >
          Todo lo que necesitas dominar en la terminal presidencial para resistir el golpe de estado.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20 relative z-10">
        
        {/* Widescreen Objective Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 border border-gta-pink bg-gta-pink/5 backdrop-blur-md text-center relative overflow-hidden gta-card-skew shadow-[0_0_25px_rgba(255,42,133,0.1)]"
        >
          <div className="absolute inset-0 danger-stripes opacity-[0.03] pointer-events-none" />
          <div className="gta-card-skew-inner">
            <div className="text-6xl font-display font-black text-white gta-text-glow-pink">
              300 SECONDS
            </div>
            <div className="font-mono text-xs font-black tracking-[0.2em] text-gta-pink uppercase mt-2">
              LÍMITE MÁXIMO // TIEMPO DE RESISTENCIA
            </div>
            <p className="mt-4 max-w-xl mx-auto text-xs font-serif italic text-slate-400 leading-relaxed">
              No tienes que erradicar por completo la disidencia política en Bolivia. Tu única meta es que el temporizador táctico llegue a cero con el gobierno en funciones.
            </p>
          </div>
        </motion.div>

        {/* Steps Grid */}
        <section className="space-y-10">
          <h2 className="text-3xl font-display font-black uppercase text-white">
            Protocolos de <span className="text-gta-cyan">Gobernabilidad</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s, idx) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-6 border bg-zinc-950/40 border-white/5 hover:border-gta-cyan/20 transition-all flex gap-4 gta-card-skew"
              >
                <div className="gta-card-skew-inner flex gap-5">
                  <div className="font-display font-black text-4xl text-white/10 shrink-0 leading-none">
                    {s.num}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-gta-cyan">{s.icon}</span>
                      <h3 className="font-display font-black text-base uppercase text-white tracking-wide">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-xs font-serif italic text-slate-400 leading-relaxed">
                      {s.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Actions Table */}
        <section className="space-y-10">
          <h2 className="text-3xl font-display font-black uppercase text-white">
            Matriz de <span className="text-gta-pink">Riesgos</span>
          </h2>
          
          <div className="border border-white/5 bg-zinc-950/70 backdrop-blur-md overflow-hidden">
            <div className="grid grid-cols-3 px-6 py-4 font-display font-black text-[10px] tracking-[0.2em] bg-gta-pink text-white uppercase">
              <span>Comando Presidencial</span>
              <span>Consecuencia de Estado</span>
              <span>Evaluación de Riesgo</span>
            </div>
            
            <div className="divide-y divide-white/5">
              {actions.map((a) => (
                <div
                  key={a.label}
                  className="grid grid-cols-3 px-6 py-4.5 text-xs items-center hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 font-display font-bold uppercase tracking-widest text-[11px] text-white">
                    <span className="text-gta-cyan">{a.icon}</span>
                    {a.label}
                  </div>
                  <div className="font-serif italic text-slate-400 pr-4 leading-relaxed">
                    {a.effect}
                  </div>
                  <div
                    className="font-mono text-[10px] tracking-widest font-black uppercase"
                    style={{ color: riskColor(a.risk) }}
                  >
                    {a.risk}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="space-y-10">
          <h2 className="text-3xl font-display font-black uppercase text-white">
            Directrices de <span className="text-gta-cyan">Inteligencia</span>
          </h2>
          
          <div className="space-y-4">
            {[
              "Activa 'Diálogo Nacional' preventivamente en el primer minuto. Bajar la agitación inicial te dará margen para respirar.",
              "Despliega 'Refuerzos Militares' en cuanto el control policial caiga del 50%. Si la defensa del palacio llega a cero, el juego termina.",
              "Establece 'Convenios Mineros' si los bloqueos duran más de 40 segundos. El ahogo financiero colapsará tu estabilidad de forma sigilosa.",
              "Evita encadenar el uso de 'Fuerza Bruta'. El enojo civil acumulado escalará en incendios de estaciones de policía y una movilización masiva.",
              "Usa 'Cadena Nacional' como escudo. Cuando el odio civil supere el 50%, este canal es la única defensa limpia y libre de efectos colaterales.",
              "Los Ponchos Rojos son la facción más beligerante. Neutralízalos con 'Fuerza Moderada' y no abuses de la diplomacia con ellos.",
            ].map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-start gap-4 p-4.5 border border-white/5 bg-zinc-950/40 hover:border-white/10 transition-colors"
              >
                <div className="shrink-0 w-7 h-7 flex items-center justify-center font-display font-black text-xs bg-gta-cyan text-black shadow-md shadow-gta-cyan/10">
                  {idx + 1}
                </div>
                <p className="text-xs font-serif italic text-slate-400 leading-relaxed pt-0.5">
                  {tip}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <p className="mb-6 font-display font-black text-sm uppercase tracking-widest text-slate-400">
            ¿ESTÁS PREPARADO PARA GOBERNAR EN EL CAOS?
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 px-12 py-5 font-display font-black text-xs uppercase tracking-[0.25em] bg-gta-pink text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-gta-pink/20 hover:shadow-gta-pink/35 border border-gta-pink"
          >
            <Zap size={16} />
            INICIAR TRANSICIÓN DE MANDO
            <ChevronRight size={14} />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
