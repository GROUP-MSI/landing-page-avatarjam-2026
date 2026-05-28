import { useTheme, themes } from "../context/ThemeContext";
import { Users, Globe } from "lucide-react";
import { GiMiner, GiRevolver } from "react-icons/gi";
import { FaPersonMilitaryToPerson } from "react-icons/fa6";
import { RiGovernmentLine } from "react-icons/ri";

export const AboutPage = () => {
  const { theme } = useTheme();
  const c = themes[theme];

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

      {/* Hero */}
      <div
        className="relative px-6 py-20 text-center"
        style={{
          background: `linear-gradient(180deg, ${c.surface} 0%, ${c.background} 100%)`,
          borderBottom: `2px solid ${c.primary}`,
        }}
      >
        <div
          className="inline-block px-4 py-1 text-xs font-semibold tracking-widest mb-6 uppercase"
          style={{ backgroundColor: c.primary, color: "#fff" }}
        >
          Sobre el proyecto
        </div>
        <h1
          className="text-5xl md:text-7xl font-black uppercase mb-4"
          style={{ color: c.text }}
        >
          CRISIS <span style={{ color: c.primary }}>ESTADO</span>
        </h1>
        <p
          className="max-w-2xl mx-auto text-lg"
          style={{
            color: c.textSecondary,
            fontFamily: "'Source Serif 4', serif",
            fontStyle: "italic",
          }}
        >
          Un proyecto universitario que convierte la crisis política boliviana
          en una experiencia interactiva de toma de decisiones.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Qué es */}
        <section>
          <h2
            className="text-3xl font-bold uppercase tracking-widest mb-8"
            style={{ color: c.text }}
          >
            ¿Qué es <span style={{ color: c.primary }}>esto</span>?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <p
              className="text-base leading-relaxed"
              style={{
                color: c.textSecondary,
                fontFamily: "'Source Serif 4', serif",
              }}
            >
              Crisis Estado es una landing page educativa e interactiva que
              modela la crisis política de Bolivia en 2024–2025. El jugador
              asume el rol del Presidente Paz y debe navegar entre facciones
              hostiles, protestas ciudadanas y la presión de fuerzas
              desestabilizadoras para mantener la gobernabilidad durante 5
              minutos críticos.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{
                color: c.textSecondary,
                fontFamily: "'Source Serif 4', serif",
              }}
            >
              El proyecto incluye 6 personajes modelados en 3D cuyos bocetos
              reflejan actores reales del conflicto: desde el líder opositor
              hasta el ciudadano de a pie que termina pagando las consecuencias
              de la inestabilidad política.
            </p>
          </div>
        </section>

        {/* Contexto */}
        <section>
          <h2
            className="text-3xl font-bold uppercase tracking-widest mb-8"
            style={{ color: c.text }}
          >
            Contexto <span style={{ color: c.primary }}>histórico</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                year: "2024",
                title: "Tensión preelectoral",
                desc: "Bolivia enfrenta una disputa por la candidatura presidencial. Evo Morales y el MAS entran en conflicto abierto.",
              },
              {
                year: "2024",
                title: "Bloqueos y marchas",
                desc: "Mineros y Ponchos Rojos toman rutas principales. La economía se paraliza. El ciudadano sufre las consecuencias.",
              },
              {
                year: "2025",
                title: "Crisis de gobernabilidad",
                desc: "El Presidente Paz enfrenta el mayor desafío: mantener el orden sin provocar más caos con el uso de la fuerza.",
              },
            ].map((item) => (
              <div
                key={item.year + item.title}
                className="p-6"
                style={{
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.surface,
                }}
              >
                <div
                  className="text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: c.primary }}
                >
                  {item.year}
                </div>
                <div
                  className="font-bold text-lg uppercase mb-3"
                  style={{ color: c.text }}
                >
                  {item.title}
                </div>
                <p
                  className="text-sm"
                  style={{
                    color: c.textSecondary,
                    fontFamily: "'Source Serif 4', serif",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Los 6 actores */}
        <section>
          <h2
            className="text-3xl font-bold uppercase tracking-widest mb-8"
            style={{ color: c.text }}
          >
            Los <span style={{ color: c.primary }}>6 actores</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: <RiGovernmentLine size={20} />,
                name: "Presidente Paz",
                rol: "Héroe / Jugador",
                desc: "Presidente constitucional. Debe equilibrar fuerza y diálogo para sobrevivir 5 minutos de crisis.",
              },
              {
                icon: <GiRevolver size={20} />,
                name: "Ponchos Rojos",
                rol: "Facción hostil",
                desc: "Milicia leal a Evo. Marchan, bloquean y radicalizan el conflicto con cada escalada.",
              },
              {
                icon: <GiMiner size={20} />,
                name: "Mineros",
                rol: "Facción hostil",
                desc: "Bloquean carreteras y aeropuertos. Negociables con concesiones, pero sin paciencia infinita.",
              },
              {
                icon: <Globe size={20} />,
                name: "Evo Morales",
                rol: "Antagonista",
                desc: "Orquesta la desestabilización desde las sombras. No actúa directamente pero moviliza las facciones.",
              },
              {
                icon: <Users size={20} />,
                name: "Ciudadano",
                rol: "Neutro / Víctima",
                desc: "El pueblo de a pie. Si los bloqueos duran o hay represión brutal, se une a la protesta y puede ser el golpe final.",
              },
              {
                icon: <FaPersonMilitaryToPerson size={20} />,
                name: "Militares / Policía",
                rol: "Tu fuerza",
                desc: "Tu herramienta de orden. Si pierden casas o moral, disminuyen. Sin ellos, el gobierno cae.",
              },
            ].map((actor) => (
              <div
                key={actor.name}
                className="flex items-start gap-4 p-4"
                style={{
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.surface,
                }}
              >
                <div
                  className="mt-1 p-2 shrink-0"
                  style={{
                    backgroundColor: `${c.primary}20`,
                    color: c.primary,
                  }}
                >
                  {actor.icon}
                </div>
                <div>
                  <div
                    className="font-bold uppercase tracking-wide"
                    style={{ color: c.text }}
                  >
                    {actor.name}
                    <span
                      className="ml-3 text-xs font-normal tracking-widest"
                      style={{ color: c.textSecondary }}
                    >
                      {actor.rol}
                    </span>
                  </div>
                  <p
                    className="text-sm mt-1"
                    style={{
                      color: c.textSecondary,
                      fontFamily: "'Source Serif 4', serif",
                    }}
                  >
                    {actor.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Equipo */}
        <section>
          <h2
            className="text-3xl font-bold uppercase tracking-widest mb-8"
            style={{ color: c.text }}
          >
            El <span style={{ color: c.primary }}>equipo</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Deynar Luis Calle", uni: "Unifranz Bolivia" },
              { name: "Wilmer Cruz", uni: "Unifranz Bolivia" },
              { name: "Luis Diego Blanco", uni: "Unifranz Bolivia" },
            ].map((m) => (
              <div
                key={m.name}
                className="p-6 text-center"
                style={{
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.surface,
                }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-2xl font-black"
                  style={{
                    backgroundColor: `${c.primary}20`,
                    color: c.primary,
                    border: `2px solid ${c.primary}`,
                  }}
                >
                  {m.name.charAt(0)}
                </div>
                <div
                  className="font-bold uppercase tracking-wide"
                  style={{ color: c.text }}
                >
                  {m.name}
                </div>
                <div
                  className="text-xs tracking-widest uppercase mt-1"
                  style={{ color: c.textSecondary }}
                >
                  {m.uni}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
