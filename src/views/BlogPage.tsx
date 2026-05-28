import { useTheme, themes } from "../context/ThemeContext";
import { Calendar, Clock, ChevronRight, Tag } from "lucide-react";

const posts = [
  {
    id: 1,
    tag: "Política",
    title:
      "¿Por qué Bolivia está en crisis? El conflicto Arce–Morales explicado",
    excerpt:
      "El enfrentamiento entre el presidente Arce y el líder del MAS histórico, Evo Morales, fracturó al partido gobernante y abrió la puerta a la inestabilidad que hoy modela el juego Crisis Estado.",
    date: "12 Mar 2025",
    readTime: "5 min",
    featured: true,
  },
  {
    id: 2,
    tag: "Personajes",
    title: "Los Ponchos Rojos: historia de una milicia política",
    excerpt:
      "Originarios del altiplano, los Ponchos Rojos pasaron de guardia ceremonial aymara a fuerza de choque política. Conoce su rol en el juego y en la historia real.",
    date: "8 Mar 2025",
    readTime: "4 min",
    featured: false,
  },
  {
    id: 3,
    tag: "Personajes",
    title: "Mineros en Bolivia: bloqueos como arma política",
    excerpt:
      "Los mineros cooperativistas tienen una historia de movilización que va más allá de las condiciones laborales. En el juego, su nivel de agitación puede colapsar la economía.",
    date: "5 Mar 2025",
    readTime: "4 min",
    featured: false,
  },
  {
    id: 4,
    tag: "Diseño 3D",
    title: "De boceto a modelo: el proceso de diseño de los 6 personajes",
    excerpt:
      "El equipo de Unifranz documenta el proceso creativo detrás de los 6 modelos 3D del proyecto, desde la investigación visual hasta los bocetos preliminares.",
    date: "1 Mar 2025",
    readTime: "6 min",
    featured: false,
  },
  {
    id: 5,
    tag: "Mecánicas",
    title: "Equilibrio y caos: cómo funciona el sistema de estabilidad",
    excerpt:
      "Cada decisión tiene consecuencias encadenadas. Este artículo explica la lógica detrás del motor de juego: por qué la fuerza bruta es tentadora pero mortal.",
    date: "25 Feb 2025",
    readTime: "7 min",
    featured: false,
  },
];

export default function BlogPage() {
  const { theme } = useTheme();
  const c = themes[theme];

  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

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
          Diario del proyecto
        </div>
        <h1 className="text-5xl font-black uppercase" style={{ color: c.text }}>
          BLOG <span style={{ color: c.primary }}>CRISIS ESTADO</span>
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Post destacado */}
        {featured && (
          <div
            className="mb-12 p-8 relative overflow-hidden"
            style={{
              border: `2px solid ${c.primary}`,
              backgroundColor: c.surface,
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-5"
              style={{
                backgroundColor: c.primary,
                clipPath: "polygon(100% 0, 0 0, 100% 100%)",
              }}
            />
            <div
              className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase mb-4"
              style={{ backgroundColor: c.primary, color: "#fff" }}
            >
              Artículo destacado
            </div>
            <h2
              className="text-3xl font-black uppercase mb-4 leading-tight"
              style={{ color: c.text }}
            >
              {featured.title}
            </h2>
            <p
              className="text-base mb-6"
              style={{
                color: c.textSecondary,
                fontFamily: "'Source Serif 4', serif",
              }}
            >
              {featured.excerpt}
            </p>
            <div
              className="flex items-center gap-6 text-xs"
              style={{ color: c.textSecondary }}
            >
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {featured.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {featured.readTime} lectura
              </span>
              <span className="flex items-center gap-1">
                <Tag size={12} /> {featured.tag}
              </span>
            </div>
          </div>
        )}

        {/* Grid de posts */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <div
              key={post.id}
              className="p-6 group cursor-pointer transition-all duration-200"
              style={{
                border: `1px solid ${c.border}`,
                backgroundColor: c.surface,
              }}
            >
              <div
                className="inline-block px-2 py-0.5 text-xs font-bold tracking-widest uppercase mb-3"
                style={{ backgroundColor: `${c.primary}20`, color: c.primary }}
              >
                {post.tag}
              </div>
              <h3
                className="font-bold uppercase text-lg leading-snug mb-3"
                style={{ color: c.text }}
              >
                {post.title}
              </h3>
              <p
                className="text-sm mb-4"
                style={{
                  color: c.textSecondary,
                  fontFamily: "'Source Serif 4', serif",
                }}
              >
                {post.excerpt}
              </p>
              <div
                className="flex items-center justify-between text-xs"
                style={{ color: c.textSecondary }}
              >
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </span>
                <span
                  className="flex items-center gap-1 font-bold uppercase tracking-widest"
                  style={{ color: c.primary }}
                >
                  Leer <ChevronRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
