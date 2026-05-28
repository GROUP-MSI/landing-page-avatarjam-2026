import { useTheme, themes } from "../context/ThemeContext";
import { Calendar, Clock, ChevronRight, Tag, BookOpen, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    tag: "Política",
    title:
      "¿Por qué Bolivia está en crisis? El conflicto Arce–Morales explicado",
    excerpt:
      "El enfrentamiento fratricida entre el presidente Arce y el líder del MAS histórico, Evo Morales, fracturó al partido gobernante y abrió la puerta a la inestabilidad civil que hoy modela el juego Crisis Estado.",
    date: "12 Mar 2025",
    readTime: "5 min",
    featured: true,
  },
  {
    id: 2,
    tag: "Personajes",
    title: "Los Ponchos Rojos: historia de una milicia política",
    excerpt:
      "Originarios del altiplano paceño, los Ponchos Rojos pasaron de guardia ceremonial aymara a fuerza de choque armada. Conoce su rol en el juego y en la historia real boliviana.",
    date: "8 Mar 2025",
    readTime: "4 min",
    featured: false,
  },
  {
    id: 3,
    tag: "Personajes",
    title: "Mineros en Bolivia: bloqueos como arma política",
    excerpt:
      "Los mineros cooperativistas tienen una larga trayectoria de lucha sindical. En el juego, su nivel de agitación puede paralizar rutas clave y ahogar el suministro gubernamental.",
    date: "5 Mar 2025",
    readTime: "4 min",
    featured: false,
  },
  {
    id: 4,
    tag: "Diseño 3D",
    title: "De boceto a modelo: el proceso de diseño de los 6 personajes",
    excerpt:
      "El equipo de desarrollo de Unifranz documenta el proceso creativo detrás de los 6 modelos 3D del proyecto, desde la investigación visual hasta los bocetos preliminares en arcilla digital.",
    date: "1 Mar 2025",
    readTime: "6 min",
    featured: false,
  },
  {
    id: 5,
    tag: "Mecánicas",
    title: "Equilibrio y caos: cómo funciona el motor de estabilidad",
    excerpt:
      "Cada comando emitido tiene consecuencias colaterales encadenadas. Este artículo detalla el algoritmo detrás de la estabilidad de estado: por qué la fuerza bruta es letal a mediano plazo.",
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
            <BookOpen size={12} /> DIARIO CIENTÍFICO // ANÁLISIS SINDICAL E HISTÓRICO
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-display font-black uppercase tracking-wider leading-none"
        >
          BOLETÍN <span className="bg-gradient-to-r from-gta-pink via-gta-orange to-gta-yellow bg-clip-text text-transparent gta-text-glow-pink">INFORMATIVO</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl mx-auto text-base md:text-lg font-serif italic text-slate-400 mt-6 leading-relaxed"
        >
          Investigaciones teóricas y documentación del proceso de diseño detrás de Crisis Estado.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        
        {/* Post destacado */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 p-8 border border-gta-pink bg-zinc-950/70 backdrop-blur-md relative overflow-hidden gta-card-skew shadow-[0_0_20px_rgba(255,42,133,0.15)] group cursor-pointer"
          >
            <div className="absolute right-0 top-0 bottom-0 w-24 danger-stripes-dark opacity-[0.05] pointer-events-none" />
            <div className="gta-card-skew-inner">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-gta-pink text-white font-mono text-[9px] tracking-widest font-black uppercase">
                  ARTÍCULO DESTACADO
                </span>
                <span className="flex items-center gap-1.5 text-gta-pink font-mono text-[9px] tracking-widest font-black">
                  <AlertTriangle size={12} className="animate-pulse" /> ANÁLISIS DE URGENCIA
                </span>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-display font-black uppercase mb-4 leading-snug text-white group-hover:text-gta-pink transition-colors">
                {featured.title}
              </h2>
              
              <p className="text-sm md:text-base mb-6 font-serif italic text-slate-400 leading-relaxed max-w-4xl">
                {featured.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono tracking-widest text-slate-500 uppercase border-t border-white/5 pt-5">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-gta-cyan" /> {featured.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-gta-cyan" /> {featured.readTime} LECTURA
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag size={13} className="text-gta-cyan" /> CATEGORÍA: {featured.tag}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid de posts */}
        <div className="grid md:grid-cols-2 gap-8">
          {rest.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 border bg-zinc-950/50 border-white/5 hover:border-gta-cyan/30 transition-all duration-300 gta-card-skew group cursor-pointer"
            >
              <div className="gta-card-skew-inner flex flex-col h-full justify-between">
                <div>
                  <div className="inline-block px-2.5 py-1 border border-gta-cyan/30 bg-gta-cyan/10 font-mono text-[9px] tracking-widest font-black uppercase text-gta-cyan mb-4">
                    {post.tag}
                  </div>
                  
                  <h3 className="font-display font-black uppercase text-lg leading-snug mb-3 text-white group-hover:text-gta-cyan transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs font-serif italic text-slate-400 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-500 uppercase border-t border-white/5 pt-4 mt-auto">
                  <span className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </span>
                  
                  <span className="flex items-center gap-1 font-display font-black text-gta-cyan group-hover:translate-x-1 transition-transform">
                    REVISAR <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
