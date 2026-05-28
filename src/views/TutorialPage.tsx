import { useTheme, themes } from "../context/ThemeContext";
import {
  Shield,
  Skull,
  Users,
  Zap,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { GiMiner, GiRevolver } from "react-icons/gi";
import { FaPersonMilitaryToPerson } from "react-icons/fa6";

export function TutorialPage() {
  const { theme } = useTheme();
  const c = themes[theme];

  const steps = [
    {
      num: "01",
      title: "El escenario",
      icon: <Zap size={22} />,
      content:
        "Eres el Presidente Paz. Bolivia está en llamas: Evo Morales moviliza a los Ponchos Rojos y Mineros para derrocarte. Tienes 5 minutos para sobrevivir.",
    },
    {
      num: "02",
      title: "La barra de estabilidad",
      icon: <Shield size={22} />,
      content:
        "Esta es tu vida. Si llega a 0%, el gobierno cae. Cae cuando la policía pierde fuerza, los ciudadanos se indignan demasiado o las facciones hostiles crecen sin control.",
    },
    {
      num: "03",
      title: "Las facciones hostiles",
      icon: <GiRevolver size={22} />,
      content:
        "Ponchos Rojos y Mineros suben gradualmente. Si superan el 70%, la estabilidad cae rápido. Puedes contenerlos con diálogo, negociación o fuerza, pero cada opción tiene costos.",
    },
    {
      num: "04",
      title: "Los ciudadanos",
      icon: <Users size={22} />,
      content:
        "Si los bloqueos duran mucho o usas fuerza brutal, los ciudadanos se movilizan. Con más de 80% de enojo, se convierten en el golpe de gracia para tu gobierno.",
    },
    {
      num: "05",
      title: "Tu policía y militares",
      icon: <FaPersonMilitaryToPerson size={22} />,
      content:
        "Son tu escudo. Si las casas policiales son quemadas o hay muertos, su moral cae. Sin policía activa (0%), caes de inmediato. Refuérzalos cuando puedas.",
    },
    {
      num: "06",
      title: "Las decisiones",
      icon: <TrendingUp size={22} />,
      content:
        "Tienes 6 acciones disponibles en tiempo real. Cada una afecta múltiples variables. No existe la decisión perfecta: solo el mejor equilibrio posible.",
    },
  ];

  const actions = [
    {
      label: "Diálogo nacional",
      effect: "+Estabilidad, -Tensión general",
      risk: "Bajo",
      icon: <Users size={16} />,
    },
    {
      label: "Fuerza moderada",
      effect: "-Ponchos/-Mineros, +Ciudadanos enojados",
      risk: "Medio",
      icon: <Shield size={16} />,
    },
    {
      label: "Fuerza bruta ⚠️",
      effect: "-Mucho hostil, ++Caos ciudadano, +Casas quemadas",
      risk: "Extremo",
      icon: <Skull size={16} />,
    },
    {
      label: "Negociar con mineros",
      effect: "-Mineros, +Estabilidad",
      risk: "Bajo",
      icon: <GiMiner size={16} />,
    },
    {
      label: "Llamar refuerzos",
      effect: "+Policía, +Estabilidad",
      risk: "Bajo",
      icon: <FaPersonMilitaryToPerson size={16} />,
    },
    {
      label: "Cadena nacional",
      effect: "-Ciudadanos enojados",
      risk: "Bajo",
      icon: <Zap size={16} />,
    },
  ];

  const riskColor = (r: string) =>
    r === "Bajo" ? "#22c55e" : r === "Medio" ? "#f59e0b" : c.primary;

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
          Manual del jugador
        </div>
        <h1 className="text-5xl font-black uppercase" style={{ color: c.text }}>
          CÓMO <span style={{ color: c.primary }}>JUGAR</span>
        </h1>
        <p
          className="mt-4 text-lg max-w-xl mx-auto"
          style={{
            color: c.textSecondary,
            fontFamily: "'Source Serif 4', serif",
            fontStyle: "italic",
          }}
        >
          Todo lo que necesitas saber para mantener Bolivia en pie.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Objetivo rápido */}
        <div
          className="p-8 text-center relative overflow-hidden"
          style={{
            border: `2px solid ${c.primary}`,
            backgroundColor: c.surface,
          }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${c.primary} 0px, ${c.primary} 1px, transparent 1px, transparent 16px)`,
            }}
          />
          <div className="relative">
            <div
              className="text-5xl font-black mb-2"
              style={{ color: c.primary }}
            >
              5:00
            </div>
            <div
              className="text-xl font-bold uppercase tracking-widest"
              style={{ color: c.text }}
            >
              Minutos para sobrevivir
            </div>
            <p
              className="mt-3 text-sm"
              style={{
                color: c.textSecondary,
                fontFamily: "'Source Serif 4', serif",
              }}
            >
              No necesitas resolver la crisis. Solo necesitas que el reloj
              llegue a cero con el gobierno en pie.
            </p>
          </div>
        </div>

        {/* Pasos */}
        <section>
          <h2
            className="text-3xl font-bold uppercase tracking-widest mb-8"
            style={{ color: c.text }}
          >
            Guía <span style={{ color: c.primary }}>paso a paso</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="p-6 flex gap-4"
                style={{
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.surface,
                }}
              >
                <div
                  className="shrink-0 text-3xl font-black leading-none"
                  style={{ color: `${c.primary}40` }}
                >
                  {s.num}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ color: c.primary }}>{s.icon}</span>
                    <div
                      className="font-bold uppercase tracking-wide"
                      style={{ color: c.text }}
                    >
                      {s.title}
                    </div>
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      color: c.textSecondary,
                      fontFamily: "'Source Serif 4', serif",
                    }}
                  >
                    {s.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabla de acciones */}
        <section>
          <h2
            className="text-3xl font-bold uppercase tracking-widest mb-8"
            style={{ color: c.text }}
          >
            Tabla de <span style={{ color: c.primary }}>acciones</span>
          </h2>
          <div style={{ border: `1px solid ${c.border}` }}>
            <div
              className="grid grid-cols-3 px-4 py-2 text-xs uppercase tracking-widest font-bold"
              style={{ backgroundColor: c.primary, color: "#fff" }}
            >
              <span>Acción</span>
              <span>Efecto</span>
              <span>Riesgo</span>
            </div>
            {actions.map((a, i) => (
              <div
                key={a.label}
                className="grid grid-cols-3 px-4 py-3 text-sm items-center"
                style={{
                  backgroundColor: i % 2 === 0 ? c.background : c.surface,
                  borderTop: `1px solid ${c.border}`,
                }}
              >
                <div
                  className="flex items-center gap-2"
                  style={{ color: c.text }}
                >
                  <span style={{ color: c.primary }}>{a.icon}</span>
                  <span className="font-semibold text-xs uppercase tracking-wide">
                    {a.label}
                  </span>
                </div>
                <div
                  className="text-xs"
                  style={{
                    color: c.textSecondary,
                    fontFamily: "'Source Serif 4', serif",
                  }}
                >
                  {a.effect}
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: riskColor(a.risk) }}
                >
                  {a.risk}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consejos */}
        <section>
          <h2
            className="text-3xl font-bold uppercase tracking-widest mb-8"
            style={{ color: c.text }}
          >
            Consejos <span style={{ color: c.primary }}>del veterano</span>
          </h2>
          <div className="space-y-4">
            {[
              "Usa Diálogo en los primeros 2 minutos para ganar tiempo y bajar la tensión inicial.",
              "Llama Refuerzos cuando la Policía caiga por debajo de 50%. No esperes que llegue a cero.",
              "Negocia con Mineros si sus bloqueos duran más de 30 segundos. Es más barato que dejarlos crecer.",
              "Nunca uses Fuerza Bruta dos veces seguidas. El efecto acumulado en ciudadanos puede ser mortal.",
              "Usa Cadena Nacional cuando los ciudadanos superen 50%. Es tu herramienta más segura.",
              "Los Ponchos Rojos son más difíciles de bajar. Prioriza contenerlos con Fuerza Moderada, no bruta.",
            ].map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4"
                style={{
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.surface,
                }}
              >
                <div
                  className="shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: c.primary, color: "#fff" }}
                >
                  {i + 1}
                </div>
                <p
                  className="text-sm"
                  style={{
                    color: c.textSecondary,
                    fontFamily: "'Source Serif 4', serif",
                  }}
                >
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <p
            className="mb-6 text-lg font-bold uppercase tracking-widest"
            style={{ color: c.text }}
          >
            ¿Listo para asumir el mando?
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: c.primary, color: "#fff" }}
          >
            <Zap size={18} />
            Ir al juego
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
