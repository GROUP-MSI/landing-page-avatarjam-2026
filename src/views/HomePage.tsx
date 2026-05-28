import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme, themes } from "../context/ThemeContext";
import {
  Shield,
  AlertTriangle,
  Clock,
  Skull,
  Flame,
  Users,
  Zap,
  TrendingUp,
  BarChart2,
  Play,
  X,
  Volume2,
  VolumeX,
  Activity,
  Radio,
} from "lucide-react";
import { GiMiner, GiRevolver, GiShield, GiTwoCoins } from "react-icons/gi";
import { FaPersonMilitaryToPerson, FaPersonWalking } from "react-icons/fa6";
import { MdOutlineHowToVote } from "react-icons/md";
import { RiGovernmentLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

import evoImg from "../assets/imgs/evo.png";
import ciudadanoImg from "../assets/imgs/ciudadano.png";
import pazImg from "../assets/imgs/presidente.png";
import mineroImg from "../assets/imgs/mineros.png";
import ponchosImg from "../assets/imgs/poncho_rojo.png";
import militar from "../assets/imgs/militar.png";
import { TargetModel3d } from "../components/TargetModel3d";

// ─── TIPOS ─────────────────────────────────────────────────────────────────
interface GameState {
  running: boolean;
  over: boolean;
  won: boolean;
  timeLeft: number; // segundos
  stability: number; // 0–100
  ponchos: number; // 0–100
  miners: number; // 0–100
  citizens: number; // 0–100 (angered)
  police: number; // 0–100
  events: GameEvent[];
  log: string[];
  burnedHouses: number;
  phase: "calm" | "tension" | "crisis" | "chaos";
}

interface GameEvent {
  id: number;
  type: "march" | "blockade" | "riot" | "burn" | "neutral";
  msg: string;
  urgent: boolean;
}

// ─── CONSTANTES ────────────────────────────────────────────────────────────
const TOTAL_TIME = 300; // 5 min

const initialState = (): GameState => ({
  running: false,
  over: false,
  won: false,
  timeLeft: TOTAL_TIME,
  stability: 70,
  ponchos: 30,
  miners: 25,
  citizens: 15,
  police: 80,
  events: [],
  log: [
    "⚡ El Presidente Paz toma el poder. Evo Morales ya trama en las sombras...",
  ],
  burnedHouses: 0,
  phase: "calm",
});

let eventCounter = 0;

const randomEvent = (state: GameState): GameEvent | null => {
  const roll = Math.random();
  if (roll > 0.35) return null;

  const options: GameEvent[] = [
    {
      id: ++eventCounter,
      type: "march",
      msg: "Ponchos Rojos marchan hacia el palacio de gobierno.",
      urgent: state.ponchos > 60,
    },
    {
      id: ++eventCounter,
      type: "blockade",
      msg: "Mineros bloquean la carretera al aeropuerto.",
      urgent: state.miners > 50,
    },
    {
      id: ++eventCounter,
      type: "riot",
      msg: "Ciudadanos hartos se unen a las protestas.",
      urgent: state.citizens > 50,
    },
    {
      id: ++eventCounter,
      type: "burn",
      msg: "Una casa de policía fue incendiada por manifestantes.",
      urgent: true,
    },
    {
      id: ++eventCounter,
      type: "neutral",
      msg: "Evo convoca a reunión de 'rescate de la democracia'.",
      urgent: false,
    },
  ];

  if (state.phase === "calm") return options[4];
  if (state.phase === "tension") return options[Math.floor(Math.random() * 2)];
  if (state.phase === "crisis")
    return options[Math.floor(Math.random() * 3) + 1];
  return options[Math.floor(Math.random() * options.length)];
};

// ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────
export function HomePage() {
  const { theme } = useTheme();
  const c = themes[theme];

  const [gs, setGs] = useState<GameState>(initialState());
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerSlide, setTrailerSlide] = useState(0);
  const [trailerMuted, setTrailerMuted] = useState(true);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const eventRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trailerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Imágenes de personajes con bando y degradados neón customizados
  const characters = [
    {
      name: "Evo Morales",
      role: "Antagonista Principal",
      side: "HOSTIL (SOMBRAS)",
      desc: "Orquesta la rebelión desde la clandestinidad. Busca asfixiar el gobierno.",
      icon: <MdOutlineHowToVote size={20} />,
      img: evoImg,
      color: "#ff2a85", // Rosa neón
      align: "hostil",
    },
    {
      name: "Ponchos Rojos",
      role: "Fuerza de Choque Altiplánica",
      side: "HOSTIL",
      desc: "Milicia armada y organizada. Bloquean accesos y radicalizan marchas.",
      icon: <GiRevolver size={20} />,
      img: ponchosImg,
      color: "#ff6b00", // Naranja
      align: "hostil",
    },
    {
      name: "Mineros",
      role: "Fuerza Sindical Cooperativista",
      side: "HOSTIL",
      desc: "Bloquean rutas y aeropuertos con dinamita. Demandan concesiones millonarias.",
      icon: <GiMiner size={20} />,
      img: mineroImg,
      color: "#ff6b00",
      align: "hostil",
    },
    {
      name: "Presidente Paz",
      role: "Líder del Estado",
      side: "TU PERSONAJE",
      desc: "Presidente constitucional. Debes resistir el asedio y mantener el orden pacífico.",
      icon: <RiGovernmentLine size={20} />,
      img: pazImg,
      color: "#00f0ff", // Cian
      align: "aliado",
    },
    {
      name: "El Ciudadano de a Pie",
      role: "Pueblo Civil",
      side: "NEUTRO / VÍCTIMA",
      desc: "La población atrapada. Si la represión o el desabastecimiento es alto, se subleva.",
      icon: <FaPersonWalking size={20} />,
      img: ciudadanoImg,
      color: "#facc15", // Dorado
      align: "neutro",
    },
    {
      name: "Policías y Militares",
      role: "Fuerzas del Orden",
      side: "TU DEFENSA",
      desc: "Tu escudo. Contienen disturbios y levantan bloqueos. Su moral es tu estabilidad.",
      icon: <FaPersonMilitaryToPerson size={20} />,
      img: militar,
      color: "#00f0ff",
      align: "aliado",
    },
  ];

  // ── Slides del Tráiler Cinemático Simulado ──────────────────────────────
  const trailerSlides = [
    {
      title: "BOLIVIA // 2025",
      subtitle: "El destino de la nación pende de un hilo.",
      quote:
        "El desabastecimiento asfixia las ciudades y el descontento social ruge.",
      image: pazImg,
      subText:
        "PRESIDENTE PAZ: 'No cederemos ante el chantaje de la violencia...'",
    },
    {
      title: "LAS SOMBRAS CONSPIRAN",
      subtitle: "Evo Morales moviliza sus facciones.",
      quote:
        "Los Ponchos Rojos toman las rutas del altiplano y los mineros bloquean el país.",
      image: evoImg,
      subText:
        "EVO: 'El pueblo ha despertado. Este gobierno neoliberal tiene los días contados...'",
    },
    {
      title: "CAOS EN LAS CALLES",
      subtitle: "La delgada línea roja de la democracia.",
      quote:
        "Militares y policías luchan en los puentes bloqueados. El ciudadano de a pie está harto.",
      image: mineroImg,
      subText:
        "📢 TRANSMISIÓN DE RADIO: 'Enfrentamientos en la carretera nacional...'",
    },
    {
      title: "TÚ TIENES EL MANDO",
      subtitle: "Toma las decisiones difíciles.",
      quote:
        "¿Buscarás el diálogo nacional o desplegarás la fuerza bruta del estado?",
      image: militar,
      subText: "[ TERMINAL PRESIDENCIAL ACTIVA: 5 MINUTOS PARA EL COLAPSO ]",
    },
  ];

  useEffect(() => {
    if (trailerOpen) {
      setTrailerSlide(0);
      trailerTimerRef.current = setInterval(() => {
        setTrailerSlide((prev) => (prev + 1) % trailerSlides.length);
      }, 5000);
    } else {
      if (trailerTimerRef.current) clearInterval(trailerTimerRef.current);
    }
    return () => {
      if (trailerTimerRef.current) clearInterval(trailerTimerRef.current);
    };
  }, [trailerOpen]);

  // ── Tick del juego ──────────────────────────────────────────────────────
  const tick = useCallback(() => {
    setGs((prev) => {
      if (!prev.running || prev.over) return prev;

      const newTime = prev.timeLeft - 1;

      // Degradación natural
      let ponchos = Math.min(100, prev.ponchos + (Math.random() > 0.6 ? 1 : 0));
      let miners = Math.min(100, prev.miners + (Math.random() > 0.65 ? 1 : 0));
      let citizens = Math.min(
        100,
        prev.citizens +
          (ponchos > 60 || miners > 60 ? (Math.random() > 0.4 ? 2 : 1) : 0),
      );
      let police = Math.max(
        0,
        prev.police -
          (prev.burnedHouses > 0 ? 1 : 0) -
          (Math.random() > 0.9 ? 1 : 0),
      );

      let stability =
        prev.stability -
        (ponchos > 70 ? 2 : 0) -
        (miners > 70 ? 2 : 0) -
        (citizens > 60 ? 3 : 0) -
        (police < 30 ? 3 : 0) +
        (ponchos < 30 && miners < 30 ? 1 : 0);

      stability = Math.min(100, Math.max(0, stability));

      // Fase
      let phase: GameState["phase"] = "calm";
      if (stability < 70) phase = "tension";
      if (stability < 45) phase = "crisis";
      if (stability < 20) phase = "chaos";

      // Condición de derrota
      if (stability <= 0 || police <= 0 || citizens >= 95) {
        return {
          ...prev,
          running: false,
          over: true,
          won: false,
          stability: 0,
          phase: "chaos",
          log: [
            ...prev.log.slice(-20),
            "💀 EVO MORALES GANÓ. El Palacio Quemado ha sido tomado. El gobierno cayó.",
          ],
        };
      }

      // Victoria
      if (newTime <= 0) {
        return {
          ...prev,
          running: false,
          over: true,
          won: true,
          timeLeft: 0,
          log: [
            ...prev.log.slice(-20),
            "🏆 ¡VICTORIA DE ESTADO! El Presidente Paz resistió el asedio. Bolivia recupera el orden constitucional.",
          ],
        };
      }

      return {
        ...prev,
        timeLeft: newTime,
        ponchos,
        miners,
        citizens,
        police,
        stability,
        phase,
      };
    });
  }, []);

  // ── Eventos aleatorios ──────────────────────────────────────────────────
  const spawnEvent = useCallback(() => {
    setGs((prev) => {
      if (!prev.running || prev.over) return prev;
      const ev = randomEvent(prev);
      if (!ev) return prev;
      return {
        ...prev,
        events: [...prev.events.slice(-4), ev],
        log: [...prev.log.slice(-30), `📢 ALERTA: ${ev.msg}`],
      };
    });
  }, []);

  useEffect(() => {
    if (gs.running && !gs.over) {
      timerRef.current = setInterval(tick, 1000);
      eventRef.current = setInterval(spawnEvent, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (eventRef.current) clearInterval(eventRef.current);
    };
  }, [gs.running, gs.over, tick, spawnEvent]);

  // ── ACCIONES del presidente ─────────────────────────────────────────────
  const action = (type: string) => {
    setGs((prev) => {
      if (!prev.running || prev.over) return prev;
      let { ponchos, miners, citizens, police, stability, burnedHouses, log } =
        prev;

      switch (type) {
        case "dialogo":
          stability = Math.min(100, stability + 9);
          ponchos = Math.max(0, ponchos - 6);
          miners = Math.max(0, miners - 6);
          log = [
            ...log.slice(-30),
            "🤝 CONCILIACIÓN: Diálogo nacional convocado. La tensión social disminuye.",
          ];
          break;
        case "fuerza_leve":
          police = Math.min(100, police + 6);
          ponchos = Math.max(0, ponchos - 11);
          miners = Math.max(0, miners - 9);
          citizens = Math.min(100, citizens + 4);
          stability = Math.max(0, stability - 3);
          log = [
            ...log.slice(-30),
            "🚔 SEGURIDAD: Despliegue de policía para dispersar bloqueos intermedios.",
          ];
          break;
        case "fuerza_bruta":
          police = Math.min(100, police + 12);
          ponchos = Math.max(0, ponchos - 28);
          miners = Math.max(0, miners - 23);
          citizens = Math.min(100, citizens + 22);
          stability = Math.max(0, stability - 17);
          burnedHouses = burnedHouses + (Math.random() > 0.3 ? 1 : 0);
          log = [
            ...log.slice(-30),
            `🔥 OPERACIÓN MILITAR BRUTA: Choques violentos en las calles.${burnedHouses > prev.burnedHouses ? " ¡Sectores rebeldes incendian comisaría de policía!" : ""}`,
          ];
          break;
        case "negociar":
          miners = Math.max(0, miners - 17);
          stability = Math.min(100, stability + 6);
          log = [
            ...log.slice(-30),
            "⛏️ CONCESIÓN: Firma de acuerdo minero de emergencia. Se levantan piquetes clave.",
          ];
          break;
        case "refuerzos":
          police = Math.min(100, police + 18);
          stability = Math.min(100, stability + 6);
          log = [
            ...log.slice(-30),
            "🛡️ REFUERZOS: Tropas militares entran al perímetro urbano para proteger instituciones.",
          ];
          break;
        case "calmar_ciudadanos":
          citizens = Math.max(0, citizens - 22);
          stability = Math.min(100, stability + 6);
          log = [
            ...log.slice(-30),
            "📻 CADENA NACIONAL: El Presidente Paz emite un mensaje pacificador por radio y TV.",
          ];
          break;
      }

      return {
        ...prev,
        ponchos,
        miners,
        citizens,
        police,
        stability,
        burnedHouses,
        log,
      };
    });
  };

  const startGame = () => {
    setGs({ ...initialState(), running: true });
  };

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (eventRef.current) clearInterval(eventRef.current);
    setGs(initialState());
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  const fmtTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const barColor = (val: number, invert = false) => {
    const pct = invert ? 100 - val : val;
    if (pct > 66) return c.accent; // cian
    if (pct > 33) return c.secondary; // naranja
    return c.primary; // rosa neón
  };

  const phaseLabel: Record<GameState["phase"], string> = {
    calm: "🟢 RANGO NORMAL",
    tension: "🟡 ALERTA DE TENSIÓN",
    crisis: "🟠 RIESGO DE CRISIS",
    chaos: "🔴 CAOS - ESTADO DE SITIO",
  };

  // SVG circular stroke properties for stability
  const ringRadius = 54;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset =
    ringCircumference - (gs.stability / 100) * ringCircumference;

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        backgroundColor: c.background,
        color: c.text,
      }}
      className="min-h-screen relative font-sans overflow-x-hidden"
    >
      {/* ── HERO SECTION (Sunset Vibes & Premium Typography) ────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden border-b border-white/5">
        {/* Neon sunset backdrop glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,42,133,0.15)_0%,transparent_50%),radial-gradient(circle_at_bottom,rgba(0,240,255,0.08)_0%,transparent_60%)] pointer-events-none z-0" />
        <div className="absolute inset-0 gta-grid-bg opacity-[0.35] z-0" />

        <div className="relative max-w-6xl mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-gta-pink/30 bg-gta-pink/10 text-gta-pink text-[10px] font-display font-black tracking-[0.3em] uppercase mb-8 shadow-[0_0_15px_rgba(255,42,133,0.1)] gta-card-skew"
          >
            <span className="gta-card-skew-inner flex items-center gap-2">
              <Radio size={12} className="animate-pulse" /> BOLIVIA // CRISIS
              2024–2025
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-none select-none"
          >
            <span className="block text-white tracking-widest text-[0.45em] md:text-[0.45em] leading-none mb-1 font-light block opacity-70">
              PROYECTO UNIVERSITARIO
            </span>
            <span className="block bg-gradient-to-r from-gta-pink via-gta-orange to-gta-yellow bg-clip-text text-transparent gta-text-glow-pink">
              CRISIS ESTADO
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl max-w-3xl mx-auto mb-12 mt-6 leading-relaxed font-serif italic text-slate-400"
          >
            El Palacio Quemado está cercado. Evo Morales, las milicias
            altiplánicas y sectores en conflicto demandan tu renuncia inmediata.
            Como el Presidente Paz, debes equilibrar la represión y la paz
            negociada para mantener el estado de derecho durante 5 minutos
            históricos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <button
              onClick={startGame}
              className="px-10 py-5 rounded-none font-display font-black text-xs uppercase tracking-[0.2em] bg-gta-pink text-white border border-gta-pink transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-gta-pink/25 hover:shadow-gta-pink/40 cursor-pointer flex items-center gap-3"
            >
              <Zap size={16} />
              Asumir el mando militar
            </button>

            <button
              onClick={() => setTrailerOpen(true)}
              className="px-10 py-5 rounded-none font-display font-black text-xs uppercase tracking-[0.2em] bg-transparent text-white border border-white/20 transition-all duration-300 hover:border-gta-pink hover:text-gta-pink hover:scale-105 cursor-pointer flex items-center gap-3 hover:shadow-[0_0_15px_rgba(255,42,133,0.15)]"
            >
              <Play size={16} />
              Ver Tráiler de Crisis
            </button>
          </motion.div>

          {/* Quick HUD details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto border-t border-white/5 pt-12">
            {[
              {
                label: "TIEMPO CRÍTICO",
                val: "300 SECS",
                icon: <Clock className="text-gta-pink" />,
              },
              {
                label: "FACCIÓN OPOSITORA",
                val: "EVO MORALES",
                icon: <Skull className="text-gta-pink" />,
              },
              {
                label: "ALINEACIONES Real-3D",
                val: "6 MODELOS",
                icon: <Activity className="text-gta-cyan" />,
              },
              {
                label: "UBICACIÓN CLAVE",
                val: "LA PAZ, BOLIVIA",
                icon: <Shield className="text-gta-cyan" />,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-5 border border-white/5 bg-zinc-950/40 backdrop-blur-md text-left gta-card-skew hover:border-gta-pink/20 transition-all"
              >
                <div className="gta-card-skew-inner">
                  <div className="flex items-center gap-2 text-xs font-display font-black tracking-widest text-slate-500 uppercase">
                    {stat.icon} {stat.label}
                  </div>
                  <div className="text-2xl font-display font-black text-white mt-1 uppercase tracking-wider">
                    {stat.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div>
        <TargetModel3d
          modelPath="/models_3d/animacion1.glb"
          animationName="Muerte"
          height={900}
          cameraPosition={[2, 1, 8]}
        />
      </div>

      {/* ── CINEMATIC TRAILER MODAL (SIMULATED ROCKSTAR SCREENPLAY) ────────── */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            <div className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 shadow-2xl gta-scanlines overflow-hidden">
              {/* Cinematic Widescreen Bars (Rockstar Style) */}
              <div className="absolute top-0 inset-x-0 h-12 bg-black z-30 flex items-center justify-between px-6 border-b border-white/5">
                <span className="font-display font-black text-xs tracking-[0.25em] text-gta-pink">
                  CRISIS ESTADO // TRÁILER CINEMÁTICO
                </span>
                <button
                  onClick={() => setTrailerOpen(false)}
                  className="text-white hover:text-gta-pink transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* simulated trailer display viewport */}
              <div className="relative aspect-video flex flex-col justify-between p-8 pt-16 z-10 bg-gradient-to-t from-black via-transparent to-black/60">
                {/* Visual Slide */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={trailerSlide}
                      initial={{ scale: 1.15, opacity: 0 }}
                      animate={{ scale: 1.02, opacity: 0.45 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                      className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 brightness-[0.4]"
                      style={{
                        backgroundImage: `url(${trailerSlides[trailerSlide].image})`,
                      }}
                    />
                  </AnimatePresence>

                  {/* Neon Color Splash Backdrop */}
                  <div
                    className="absolute inset-0 mix-blend-color-dodge opacity-25 blur-[100px]"
                    style={{
                      backgroundColor:
                        trailerSlides[trailerSlide].image === evoImg
                          ? "#ff2a85"
                          : "#00f0ff",
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
                </div>

                {/* Top Overlay details */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="px-3 py-1 border border-white/20 bg-black/50 text-[10px] font-mono tracking-widest text-slate-400">
                    ESCENA {trailerSlide + 1} / {trailerSlides.length}
                  </div>
                  <button
                    onClick={() => setTrailerMuted(!trailerMuted)}
                    className="p-2 border border-white/20 bg-black/50 text-white rounded-none hover:border-gta-pink transition-colors cursor-pointer"
                  >
                    {trailerMuted ? (
                      <VolumeX size={16} />
                    ) : (
                      <Volume2 size={16} />
                    )}
                  </button>
                </div>

                {/* Subtitle / Screenplay text (rockstar style) */}
                <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 mb-4">
                  <motion.div
                    key={`text-${trailerSlide}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-wider bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
                      {trailerSlides[trailerSlide].title}
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-widest text-gta-pink mt-1">
                      {trailerSlides[trailerSlide].subtitle}
                    </p>
                    <p className="font-serif italic text-base md:text-lg text-slate-300 mt-4 leading-relaxed px-4 bg-zinc-950/80 border border-white/5 py-3 backdrop-blur-md">
                      "{trailerSlides[trailerSlide].quote}"
                    </p>
                  </motion.div>
                </div>

                {/* Bottom subtitle ticker */}
                <div className="relative z-10 border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                  <span>{trailerSlides[trailerSlide].subText}</span>
                  <span className="text-gta-pink animate-pulse">
                    TRANSMISIÓN EN TIEMPO REAL
                  </span>
                </div>
              </div>

              {/* Bottom widescreen black bar with Slide Controls */}
              <div className="h-16 bg-black z-30 flex items-center justify-between px-6 border-t border-white/5">
                <div className="flex gap-2">
                  {trailerSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTrailerSlide(idx)}
                      className={`w-12 h-1 transition-all ${idx === trailerSlide ? "bg-gta-pink" : "bg-white/20"}`}
                    />
                  ))}
                </div>
                <div className="font-display font-black text-[11px] tracking-widest text-slate-400">
                  ESTRENO EXCLUSIVO DE CRISIS ESTADO // UNIFRANZ
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECTION: CHARACTER SHOWCASE (GTA conceptual Diagonal Grid) ─────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <span className="font-display font-black text-xs tracking-[0.25em] text-gta-pink uppercase">
            ROSTER DE LA CRISIS
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-wider text-white mt-1">
            Los{" "}
            <span className="bg-gradient-to-r from-gta-pink to-gta-orange bg-clip-text text-transparent">
              Personajes
            </span>
          </h2>
          <p className="font-serif italic text-slate-400 mt-3 max-w-lg mx-auto">
            Modelados de alta fidelidad 3D en desarrollo. Conoce las facciones
            en pugna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((ch, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden border bg-zinc-950 border-white/5 hover:border-gta-pink/40 shadow-2xl gta-card-skew transition-all duration-300 group"
            >
              {/* Outer Diagonal Cut Screen */}
              <div className="gta-card-skew-inner">
                {/* Image Canvas Panel */}
                <div
                  className="w-full relative overflow-hidden flex items-center justify-center"
                  style={{
                    height: 280,
                    backgroundColor: "#06060c",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Backdrop glowing color */}
                  <div
                    className="absolute inset-0 opacity-[0.1] transition-opacity duration-300 group-hover:opacity-[0.2]"
                    style={{
                      background: `radial-gradient(circle, ${ch.color} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Cyber Grid Lines */}
                  <div className="absolute inset-0 gta-grid-bg opacity-[0.2]" />

                  {/* Dynamic diagonal side bar */}
                  <div
                    className="absolute top-0 right-0 w-24 h-full skew-x-[-15deg] translate-x-12 opacity-10 border-l"
                    style={{
                      borderColor: ch.color,
                      backgroundColor: `${ch.color}10`,
                    }}
                  />

                  {/* Character PNG Illustration */}
                  <img
                    src={ch.img}
                    alt={ch.name}
                    className="h-[80%] w-auto object-contain z-10 transition-all duration-500 group-hover:scale-105 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"
                    style={{
                      filter:
                        theme === "dark"
                          ? "brightness(1) contrast(1.08)"
                          : "none",
                    }}
                  />

                  {/* Alignment Tag */}
                  <div className="absolute top-4 left-4 z-20 font-mono text-[9px] tracking-[0.2em] font-black uppercase bg-black/80 px-2.5 py-1 border border-white/10 text-slate-300">
                    ALIGN: <span style={{ color: ch.color }}>{ch.side}</span>
                  </div>

                  {ch.name === "Presidente Paz" && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 font-display font-black text-[9px] tracking-widest uppercase bg-gta-cyan text-black">
                      JUGADOR // HÉROE
                    </div>
                  )}
                </div>

                {/* Details Footer */}
                <div className="p-6 relative">
                  <div className="flex items-center gap-3">
                    <span
                      className="p-2 bg-white/5 text-slate-300 border border-white/5 rounded-none"
                      style={{ color: ch.color }}
                    >
                      {ch.icon}
                    </span>
                    <div>
                      <h3 className="font-display font-black text-lg uppercase tracking-wide text-white">
                        {ch.name}
                      </h3>
                      <div className="font-mono text-[10px] tracking-widest uppercase text-slate-500">
                        {ch.role}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs font-serif italic text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                    {ch.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TACTICAL GAME HUD INTERFACE ───────────────────────────────────── */}
      <section
        id="interactive-game"
        className="py-24 border-t border-b border-white/5 relative"
        style={{
          backgroundColor: c.surface,
        }}
      >
        <div className="absolute inset-0 gta-grid-bg opacity-[0.2] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="font-display font-black text-xs tracking-[0.25em] text-gta-cyan uppercase">
              SIMULACIÓN GUBERNAMENTAL
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-wider text-white mt-1">
              Gabinete de <span className="text-gta-pink">Crisis</span>
            </h2>
            <p className="font-serif italic text-slate-400 mt-2">
              Asume el rol en tiempo real. Mantén la estabilidad antes de que
              estalle la guerra civil.
            </p>
          </div>

          {/* ── Pantalla inicio ─────────────────────────────────────── */}
          {!gs.running && !gs.over && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-zinc-950/70 border border-white/5 backdrop-blur-md max-w-3xl mx-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,133,0.06)_0%,transparent_60%)] pointer-events-none" />

              <div
                className="font-display font-black text-8xl md:text-[10rem] tracking-tight leading-none text-white select-none relative z-10"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                5:00
              </div>

              <div className="text-sm font-mono tracking-[0.25em] text-slate-400 uppercase mt-4 mb-10">
                SISTEMA OPERATIVO DE CRISIS // TIEMPO LÍMITE
              </div>

              <button
                onClick={startGame}
                className="px-12 py-5 text-sm font-display font-black uppercase tracking-[0.25em] bg-gta-cyan text-black hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-gta-cyan/15 hover:shadow-gta-cyan/35 flex items-center gap-3 mx-auto"
              >
                <Zap size={18} />
                ASUMIR LA PRESIDENCIA
              </button>
            </motion.div>
          )}

          {/* ── Game Over Screen ───────────────────────────────────────────── */}
          {gs.over && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-zinc-950/70 border border-white/5 backdrop-blur-md max-w-3xl mx-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_60%)] pointer-events-none" />

              <div
                className="text-6xl md:text-8xl font-display font-black mb-4 uppercase tracking-wider leading-none"
                style={{ color: gs.won ? c.accent : c.primary }}
              >
                {gs.won ? "¡VICTORIA COMPLETA!" : "GOBIERNO DERROCADO"}
              </div>

              <p className="text-base md:text-lg max-w-xl mx-auto mb-10 font-serif italic text-slate-300">
                {gs.won
                  ? "El Presidente Paz sobrevivió al período crítico de 5 minutos. Las fuerzas opositoras declinan y el país retorna a la tranquilidad."
                  : "Estabilidad en 0%. Evo Morales asume el poder definitivo. La Constitución ha sido abolida."}
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-12 border-t border-b border-white/5 py-6">
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                    CASAS POLICIALES QUEMADAS
                  </div>
                  <div className="text-3xl font-display font-black text-white mt-1">
                    {gs.burnedHouses}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                    ESTABILIDAD NACIONAL FINAL
                  </div>
                  <div
                    className="text-3xl font-display font-black text-white mt-1"
                    style={{ color: barColor(gs.stability) }}
                  >
                    {gs.stability}%
                  </div>
                </div>
              </div>

              <button
                onClick={resetGame}
                className="px-10 py-4 text-xs font-display font-black uppercase tracking-widest bg-white text-black hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                CERRAR EXPEDIENTE Y REINICIAR
              </button>
            </motion.div>
          )}

          {/* ── Panel de juego (HUD Activo) ─────────────────────────── */}
          {gs.running && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna izquierda: Monitores Diagnósticos */}
              <div className="space-y-5">
                {/* 1. Reloj Táctico Militar y Fase */}
                <div
                  className="p-5 flex items-center justify-between border relative overflow-hidden"
                  style={{
                    backgroundColor: c.background,
                    borderColor: gs.stability < 30 ? c.primary : c.border,
                  }}
                >
                  {/* Low Stability Warning Shaker */}
                  {gs.stability < 30 && (
                    <div className="absolute inset-0 bg-gta-pink/5 animate-pulse pointer-events-none z-0" />
                  )}

                  <div className="relative z-10 flex items-center gap-3">
                    <Clock size={24} className="text-gta-pink animate-pulse" />
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] tracking-widest text-slate-500">
                        TIEMPO PARA EL COLAPSO
                      </span>
                      <span
                        className={`text-3xl font-display font-black tracking-widest ${
                          gs.stability < 30
                            ? "text-gta-pink animate-bounce"
                            : "text-white"
                        }`}
                      >
                        {fmtTime(gs.timeLeft)}
                      </span>
                    </div>
                  </div>

                  <div
                    className="text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1.5 border border-white/5"
                    style={{
                      backgroundColor: `${barColor(gs.stability)}20`,
                      color: barColor(gs.stability),
                    }}
                  >
                    {gs.phase}
                  </div>
                </div>

                {/* 2. Anillo Corazón Latente (Estabilidad Circular) */}
                <div className="p-6 border border-white/5 bg-zinc-950/60 backdrop-blur-md flex flex-col items-center text-center">
                  <div className="font-mono text-[10px] tracking-widest text-slate-500 uppercase mb-4">
                    ESTABILIDAD CONSTITUCIONAL
                  </div>

                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* background ring */}
                      <circle
                        cx="72"
                        cy="72"
                        r={ringRadius}
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      {/* indicator ring */}
                      <circle
                        cx="72"
                        cy="72"
                        r={ringRadius}
                        stroke={barColor(gs.stability)}
                        strokeWidth="10"
                        strokeDasharray={ringCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                        style={{
                          filter: `drop-shadow(0 0 8px ${barColor(gs.stability)}50)`,
                        }}
                      />
                    </svg>

                    {/* inner text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display font-black text-3xl text-white">
                        {gs.stability}%
                      </span>
                      <span
                        className="text-[9px] font-mono tracking-widest uppercase mt-0.5 animate-pulse"
                        style={{ color: barColor(gs.stability) }}
                      >
                        {gs.stability > 60
                          ? "SEGURO"
                          : gs.stability > 30
                            ? "TENSIÓN"
                            : "PELIGRO"}
                      </span>
                    </div>
                  </div>

                  {/* Stability Label Description */}
                  <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase mt-4">
                    {phaseLabel[gs.phase]}
                  </span>
                </div>

                {/* 3. Diagnósticos de Sectores en Conflicto */}
                <div className="space-y-3.5">
                  {[
                    {
                      label: "Ponchos Rojos (Altiplano)",
                      val: gs.ponchos,
                      icon: <GiRevolver size={14} />,
                      invert: true,
                      limit: 70,
                      alertMsg: "MOVILIZACIÓN SINDICAL DETECTADA",
                    },
                    {
                      label: "Mineros (Bloqueos de Carreteras)",
                      val: gs.miners,
                      icon: <GiMiner size={14} />,
                      invert: true,
                      limit: 65,
                      alertMsg: "BLOQUEO ECONÓMICO EN RUTA",
                    },
                    {
                      label: "Ciudadanos Enojados (Resistencia)",
                      val: gs.citizens,
                      icon: <Users size={14} />,
                      invert: true,
                      limit: 75,
                      alertMsg: "RIESGO DE INSURRECCIÓN POPULAR",
                    },
                    {
                      label: "Fuerzas Policiales (Moral y Control)",
                      val: gs.police,
                      icon: <FaPersonMilitaryToPerson size={14} />,
                      invert: false,
                      limit: 30,
                      alertMsg: "DESERCIÓN POLICIAL INMINENTE",
                    },
                  ].map((bar) => {
                    const isAlert = bar.invert
                      ? bar.val > bar.limit
                      : bar.val < bar.limit;
                    return (
                      <div
                        key={bar.label}
                        style={{
                          backgroundColor: c.background,
                          borderColor: isAlert ? c.primary : c.border,
                        }}
                        className={`p-4 border transition-all duration-300 ${isAlert ? "shadow-[0_0_15px_rgba(255,42,133,0.15)]" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-[10px] font-display font-black tracking-widest uppercase text-slate-400">
                            <span
                              style={{ color: isAlert ? c.primary : c.accent }}
                            >
                              {bar.icon}
                            </span>
                            {bar.label}
                          </div>
                          <span
                            className="font-mono text-xs font-black"
                            style={{ color: barColor(bar.val, bar.invert) }}
                          >
                            {bar.val}%
                          </span>
                        </div>

                        {/* Segmented Digital Progress Bar */}
                        <div className="h-2 w-full bg-zinc-950 flex gap-0.5 border border-white/5">
                          {Array.from({ length: 10 }).map((_, idx) => {
                            const stepLimit = (idx + 1) * 10;
                            const isActive = bar.val >= stepLimit;
                            return (
                              <div
                                key={idx}
                                className="h-full flex-grow transition-all duration-500"
                                style={{
                                  backgroundColor: isActive
                                    ? barColor(bar.val, bar.invert)
                                    : "transparent",
                                }}
                              />
                            );
                          })}
                        </div>

                        {/* Digital Alert Strobe Banner */}
                        {isAlert && (
                          <div className="font-mono text-[8px] tracking-[0.2em] text-gta-pink animate-pulse mt-2 uppercase font-black">
                            ⚠️ ADVERTENCIA: {bar.alertMsg}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 4. Alerta de Casas Policiales Quemadas */}
                {gs.burnedHouses > 0 && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 flex items-center gap-3 border border-gta-pink bg-gta-pink/10 shadow-[0_0_20px_rgba(255,42,133,0.2)] animate-pulse"
                  >
                    <Flame size={20} className="text-gta-pink" />
                    <div className="flex flex-col">
                      <span className="font-display font-black text-xs text-white uppercase tracking-wider">
                        {gs.burnedHouses} SECCIONAL
                        {gs.burnedHouses > 1 ? "ES" : ""} POLICIAL
                        {gs.burnedHouses > 1 ? "ES" : ""} INCENDIADA
                        {gs.burnedHouses > 1 ? "S" : ""}
                      </span>
                      <span className="font-mono text-[9px] tracking-widest text-gta-pink uppercase mt-0.5">
                        LA DEFENSA DEL ESTADO SE DECRECE ACELERADAMENTE
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Columna centro: Consola de Decisiones del Presidente */}
              <div>
                <div className="border border-white/5 bg-zinc-950/60 backdrop-blur-md p-6 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="font-display font-black text-[10px] tracking-[0.25em] text-gta-cyan uppercase">
                        CONSOLA DE TRIGGERS
                      </span>
                      <h3 className="font-display font-black text-xl uppercase tracking-wider text-white">
                        Acciones Presidenciales
                      </h3>
                    </div>
                    <Radio
                      size={18}
                      className="text-gta-cyan animate-pulse animate-neon-cyan"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 flex-grow">
                    {[
                      {
                        id: "dialogo",
                        code: "CMD-01",
                        label: "Convocatoria Diálogo Nacional",
                        desc: "Incrementa estabilidad y calma a las facciones altiplánicas.",
                        effect: "+9% ESTABILIDAD, -6% FACCIONES",
                        icon: <Users size={18} />,
                        danger: false,
                      },
                      {
                        id: "fuerza_leve",
                        code: "CMD-02",
                        label: "Despliegue Antidisturbios",
                        desc: "Contiene a Ponchos y Mineros, pero agita moderadamente la opinión pública.",
                        effect: "+6% DEFENSA, -11% PONCHOS ROJOS",
                        icon: <Shield size={18} />,
                        danger: false,
                      },
                      {
                        id: "negociar",
                        code: "CMD-03",
                        label: "Firma de Convenio Minero",
                        desc: "Negociación directa. Levanta bloqueos mineros de inmediato.",
                        effect: "-17% MINEROS, +6% ESTABILIDAD",
                        icon: <GiTwoCoins size={18} />,
                        danger: false,
                      },
                      {
                        id: "refuerzos",
                        code: "CMD-04",
                        label: "Llamar Refuerzos Militares",
                        desc: "Fortalece las fuerzas de seguridad del Palacio Quemado.",
                        effect: "+18% MILITARES, +6% ESTABILIDAD",
                        icon: <FaPersonMilitaryToPerson size={18} />,
                        danger: false,
                      },
                      {
                        id: "calmar_ciudadanos",
                        code: "CMD-05",
                        label: "Mensaje en Cadena Nacional",
                        desc: "Disminuye fuertemente la ira civil de la población.",
                        effect: "-22% CIVILES ENOJADOS, +6% ESTABILIDAD",
                        icon: <MdOutlineHowToVote size={18} />,
                        danger: false,
                      },
                      {
                        id: "fuerza_bruta",
                        code: "CMD-06",
                        label: "Uso de Fuerza Bruta Militar ⚠️",
                        desc: "Golpe contundente a rebeldes, pero incita al odio civil extremo e incendios.",
                        effect: "-28% REBELDES, ++CIVILES, ++RIESGO INCENDIO",
                        icon: <Skull size={18} />,
                        danger: true,
                      },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => action(btn.id)}
                        className={`w-full text-left p-4.5 border transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] relative cursor-pointer group ${
                          btn.danger
                            ? "border-gta-pink bg-gta-pink/5 hover:bg-gta-pink/15"
                            : "border-white/5 bg-zinc-950/70 hover:bg-zinc-900/60 hover:border-gta-cyan/30"
                        }`}
                      >
                        {/* Hazard stripes overlay for military danger button */}
                        {btn.danger && (
                          <div className="absolute right-0 top-0 bottom-0 w-8 danger-stripes-dark opacity-10 pointer-events-none" />
                        )}

                        <div className="flex items-start gap-4">
                          <span
                            className={`p-2 border rounded-none shrink-0 ${
                              btn.danger
                                ? "border-gta-pink text-gta-pink bg-gta-pink/10"
                                : "border-white/10 text-gta-cyan bg-white/5"
                            }`}
                          >
                            {btn.icon}
                          </span>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <span className="font-mono text-[9px] tracking-widest text-slate-500 font-bold">
                                {btn.code}
                              </span>
                              <span className="font-mono text-[9px] tracking-widest text-gta-pink font-bold">
                                {btn.effect}
                              </span>
                            </div>

                            <h4 className="font-display font-black text-sm uppercase tracking-wide text-white mt-0.5 group-hover:text-gta-cyan transition-colors">
                              {btn.label}
                            </h4>

                            <p className="text-[11px] text-slate-400 font-serif italic mt-1 leading-relaxed">
                              {btn.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna derecha: Inteligencia de Eventos Activos y Ticker Log */}
              <div className="space-y-5">
                {/* 1. Alertas de Eventos Activos de Inteligencia */}
                <div
                  style={{
                    backgroundColor: c.background,
                    borderColor: gs.events.some((e) => e.urgent)
                      ? c.primary
                      : c.border,
                  }}
                  className="border transition-all duration-300"
                >
                  <div
                    className="px-4 py-3 flex items-center justify-between border-b"
                    style={{
                      backgroundColor: gs.events.some((e) => e.urgent)
                        ? `${c.primary}15`
                        : c.surface,
                      borderColor: c.border,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        size={16}
                        className={
                          gs.events.some((e) => e.urgent)
                            ? "text-gta-pink animate-pulse"
                            : "text-gta-orange"
                        }
                      />
                      <span className="font-display font-black text-xs tracking-widest uppercase text-white">
                        REPORTES DE INTELIGENCIA
                      </span>
                    </div>
                    <Radio size={14} className="text-slate-500 animate-pulse" />
                  </div>

                  <div className="p-2 space-y-2">
                    {gs.events.length === 0 ? (
                      <div className="text-center py-8 text-xs font-mono tracking-wider text-slate-600 uppercase">
                        SIN NOVEDADES // MONITOREO ESTABLE
                      </div>
                    ) : (
                      gs.events.slice(-3).map((ev) => (
                        <motion.div
                          key={ev.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-3.5 border text-xs font-mono uppercase tracking-wide relative overflow-hidden flex gap-2.5 items-start ${
                            ev.urgent
                              ? "border-gta-pink bg-gta-pink/5 text-gta-pink"
                              : "border-white/5 bg-zinc-950/40 text-slate-300"
                          }`}
                        >
                          <span className="shrink-0">
                            {ev.urgent ? "🚨" : "📢"}
                          </span>
                          <div>
                            <div className="font-black text-[9px] tracking-widest text-slate-500">
                              REPORTE #{ev.id}
                            </div>
                            <div className="mt-1 leading-relaxed">{ev.msg}</div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                {/* 2. Hacker Bitácora Live Ticker */}
                <div
                  style={{
                    backgroundColor: c.background,
                    borderColor: c.border,
                  }}
                  className="border overflow-hidden"
                >
                  <div
                    className="px-4 py-3 flex items-center justify-between border-b"
                    style={{
                      backgroundColor: c.surface,
                      borderColor: c.border,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <BarChart2 size={16} className="text-gta-cyan" />
                      <span className="font-display font-black text-xs tracking-widest uppercase text-white">
                        REGISTRO DE COMUNICACIONES ƒ(X)
                      </span>
                    </div>
                    <Activity
                      size={14}
                      className="text-gta-cyan animate-pulse"
                    />
                  </div>

                  {/* Monospaced Green Terminal Console Scroll */}
                  <div className="p-4 space-y-2.5 max-h-[360px] overflow-y-auto font-mono text-[11px] leading-relaxed relative bg-black/60">
                    {/* Vertical Green Ticker Line */}
                    <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gta-cyan/10 pointer-events-none" />

                    {gs.log
                      .slice(-15)
                      .reverse()
                      .map((entry, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pl-5 relative"
                          style={{
                            color:
                              i === 0 ? c.text : "rgba(255, 255, 255, 0.4)",
                          }}
                        >
                          {/* Bullet marker */}
                          <span
                            className="absolute left-1.5 top-1.5 w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor:
                                i === 0 ? c.accent : "rgba(255, 255, 255, 0.2)",
                              boxShadow:
                                i === 0 ? `0 0 8px ${c.accent}` : "none",
                            }}
                          />

                          {/* Entry text */}
                          <span
                            className={
                              i === 0 ? "gta-text-glow-cyan font-bold" : ""
                            }
                          >
                            {entry}
                          </span>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SECCIÓN: CÓMO GANAR (Estrategias en Tarjetas Holográficas) ───────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 z-10 relative">
        <div className="text-center mb-16">
          <span className="font-display font-black text-xs tracking-[0.25em] text-gta-pink uppercase">
            PLAN DE GOBIERNO
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-wider text-white mt-1">
            Manual de{" "}
            <span className="bg-gradient-to-r from-gta-pink to-gta-yellow bg-clip-text text-transparent">
              Estrategia
            </span>
          </h2>
          <p className="font-serif italic text-slate-400 mt-2 max-w-md mx-auto">
            Tres rutas viables. Múltiples desenlaces de gobernabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <TrendingUp size={32} />,
              title: "1. Ruta de Diálogo Social",
              desc: "Prioriza cadenas nacionales y mesas de diálogo. Mitiga la agitación ciudadana y el descontento, asegurando una supervivencia gradual pero firme.",
              risk: "RIESGO CRÍTICO BAJO",
              color: "#00f0ff", // Cian
            },
            {
              icon: <GiShield size={32} />,
              title: "2. Contención Defensiva",
              desc: "Combina fuerzas de choque tácticas con negociación minera parcial. Mantiene la moral militar alta a cambio de concesiones económicas controladas.",
              risk: "RIESGO CRÍTICO MEDIO",
              color: "#facc15", // Dorado
            },
            {
              icon: <Skull size={32} />,
              title: "3. Ley de Seguridad Interna",
              desc: "Fuerza bruta extrema para limpiar las calles al instante. Altamente arriesgada: un solo paso en falso y el repudio civil quemará el gobierno.",
              risk: "PELIGRO EXTREMO",
              color: "#ff2a85", // Rosa neón
            },
          ].map((r, idx) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 border bg-zinc-950/60 border-white/5 hover:border-gta-pink/25 shadow-2xl gta-card-skew transition-all group"
            >
              <div className="gta-card-skew-inner">
                <div
                  className="mb-6 p-3.5 inline-block border border-white/10 rounded-none bg-white/5 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: r.color }}
                >
                  {r.icon}
                </div>

                <h3 className="font-display font-black text-xl uppercase tracking-wide text-white mb-3">
                  {r.title}
                </h3>

                <p className="text-sm font-serif italic text-slate-400 leading-relaxed mb-6 border-b border-white/5 pb-6">
                  {r.desc}
                </p>

                <div
                  className="font-mono text-xs font-black tracking-widest uppercase"
                  style={{ color: r.color }}
                >
                  ESTADO: {r.risk}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
