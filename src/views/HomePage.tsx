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
  ChevronRight,
  BarChart2,
} from "lucide-react";
import { GiMiner, GiRevolver, GiShield, GiTwoCoins } from "react-icons/gi";
import { FaPersonMilitaryToPerson, FaPersonWalking } from "react-icons/fa6";
import { MdOutlineHowToVote } from "react-icons/md";
import { RiGovernmentLine } from "react-icons/ri";

import evoImg from "../assets/imgs/evo.png";
import ciudadanoImg from "../assets/imgs/ciudadano.png";
import pazImg from "../assets/imgs/presidente.png";
import mineroImg from "../assets/imgs/mineros.png";
import ponchosImg from "../assets/imgs/poncho_rojo.png";
import militar from "../assets/imgs/militar.png";

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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const eventRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Imágenes de personajes (slots vacíos para que el usuario añada)
  const characters = [
    {
      name: "Evo Morales",
      role: "Antagonista",
      icon: <MdOutlineHowToVote size={28} />,
      img: evoImg,
    },
    {
      name: "Ponchos Rojos",
      role: "Facción Hostil",
      icon: <GiRevolver size={28} />,
      img: ponchosImg,
    },
    {
      name: "Mineros",
      role: "Facción Hostil",
      icon: <GiMiner size={28} />,
      img: mineroImg,
    },
    {
      name: "Pdte. Paz",
      role: "Héroe / Tú",
      icon: <RiGovernmentLine size={28} />,
      img: pazImg,
    },
    {
      name: "Ciudadano",
      role: "Neutro / Víctima",
      icon: <FaPersonWalking size={28} />,
      img: ciudadanoImg,
    },
    {
      name: "Militares / Policía",
      role: "Tu fuerza",
      icon: <FaPersonMilitaryToPerson size={28} />,
      img: militar,
    },
  ];

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
            "💀 EVO GANÓ. El gobierno cayó. El pueblo fue saqueado.",
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
            "🏆 ¡SOBREVIVISTE! El Presidente Paz aguantó los 5 minutos críticos.",
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
        log: [...prev.log.slice(-30), `📢 ${ev.msg}`],
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
          stability = Math.min(100, stability + 8);
          ponchos = Math.max(0, ponchos - 5);
          miners = Math.max(0, miners - 5);
          log = [
            ...log.slice(-30),
            "🤝 Diálogo iniciado. La tensión baja un poco.",
          ];
          break;
        case "fuerza_leve":
          police = Math.min(100, police + 5);
          ponchos = Math.max(0, ponchos - 10);
          miners = Math.max(0, miners - 8);
          citizens = Math.min(100, citizens + 5);
          stability = Math.max(0, stability - 3);
          log = [
            ...log.slice(-30),
            "🚔 Fuerza moderada. Dispersión parcial pero ciudadanos molestos.",
          ];
          break;
        case "fuerza_bruta":
          police = Math.min(100, police + 10);
          ponchos = Math.max(0, ponchos - 25);
          miners = Math.max(0, miners - 20);
          citizens = Math.min(100, citizens + 20);
          stability = Math.max(0, stability - 15);
          burnedHouses = burnedHouses + (Math.random() > 0.4 ? 1 : 0);
          log = [
            ...log.slice(-30),
            `💥 Uso de fuerza bruta. ¡PELIGROSO! Más civiles se indignan.${burnedHouses > prev.burnedHouses ? " 🔥 ¡Casa policial quemada!" : ""}`,
          ];
          break;
        case "negociar":
          miners = Math.max(0, miners - 15);
          stability = Math.min(100, stability + 5);
          log = [
            ...log.slice(-30),
            "⛏️ Concesiones a mineros. Bloqueos se levantan parcialmente.",
          ];
          break;
        case "refuerzos":
          police = Math.min(100, police + 15);
          stability = Math.min(100, stability + 5);
          log = [
            ...log.slice(-30),
            "🛡️ Refuerzos llegaron. Las fuerzas del orden se fortalecen.",
          ];
          break;
        case "calmar_ciudadanos":
          citizens = Math.max(0, citizens - 20);
          stability = Math.min(100, stability + 5);
          log = [
            ...log.slice(-30),
            "📻 Cadena nacional. Ciudadanos informados, algo más calmados.",
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
    if (pct > 66) return c.primary;
    if (pct > 33) return "#f59e0b";
    return "#22c55e";
  };

  const phaseLabel: Record<GameState["phase"], string> = {
    calm: "🟢 CALMA",
    tension: "🟡 TENSIÓN",
    crisis: "🟠 CRISIS",
    chaos: "🔴 CAOS",
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        backgroundColor: c.background,
        color: c.text,
        fontFamily: "'Oswald', sans-serif",
      }}
      className="min-h-screen"
    >
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');`}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${c.background} 0%, ${c.surface} 50%, ${c.background} 100%)`,
          borderBottom: `2px solid ${c.primary}`,
        }}
      >
        {/* Fondo decorativo */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${c.primary} 0px, ${c.primary} 1px, transparent 1px, transparent 20px)`,
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div
            className="inline-block px-4 py-1 text-xs font-semibold tracking-widest mb-6 uppercase"
            style={{
              backgroundColor: c.primary,
              color: "#fff",
              letterSpacing: "0.3em",
            }}
          >
            Bolivia 2024–2025
          </div>
          <h1
            className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none"
            style={{ color: c.text, letterSpacing: "-0.02em" }}
          >
            CRISIS
            <span style={{ color: c.primary }}> ESTADO</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            style={{
              color: c.textSecondary,
              fontFamily: "'Source Serif 4', serif",
              fontStyle: "italic",
            }}
          >
            Eres el Presidente Paz. Evo Morales, sus Ponchos Rojos y los Mineros
            quieren derrocarte. Mantén la estabilidad 5 minutos. El pueblo
            depende de ti.
          </p>

          {/* Stats rápidos */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              { label: "Tiempo límite", val: "5 min" },
              { label: "Facciones hostiles", val: "3" },
              { label: "Tu objetivo", val: "Sobrevivir" },
            ].map((s) => (
              <div
                key={s.label}
                className="px-6 py-3"
                style={{
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.surface,
                }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{ color: c.primary }}
                >
                  {s.val}
                </div>
                <div
                  className="text-xs tracking-widest uppercase"
                  style={{ color: c.textSecondary }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONAJES ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2
          className="text-3xl font-bold uppercase tracking-widest mb-2 text-center"
          style={{ color: c.text }}
        >
          Los <span style={{ color: c.primary }}>Personajes</span>
        </h2>
        <p
          className="text-center mb-10 text-sm tracking-widest uppercase"
          style={{ color: c.textSecondary }}
        >
          6 modelos — bocetos en proceso
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {characters.map((ch, i) => (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{
                border: `2px solid ${ch.name === "Pdte. Paz" ? c.primary : c.border}`,
                backgroundColor: c.surface,
              }}
            >
              {/* Slot de imagen */}
              <div
                className="w-full flex items-center justify-center relative"
                style={{
                  height: 200,
                  backgroundColor:
                    ch.name === "Pdte. Paz" ? `${c.primary}15` : c.background,
                  borderBottom: `1px solid ${c.border}`,
                }}
              >
                {/* ← REEMPLAZA ESTE DIV CON TU <img src="..."> */}
                <img src={ch.img} alt={ch.name} />

                {ch.name === "Pdte. Paz" && (
                  <div
                    className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold uppercase"
                    style={{ backgroundColor: c.primary, color: "#fff" }}
                  >
                    Tú
                  </div>
                )}
                {ch.name === "Evo Morales" && (
                  <div
                    className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold uppercase"
                    style={{
                      backgroundColor: "#1a1a1a",
                      color: c.primary,
                      border: `1px solid ${c.primary}`,
                    }}
                  >
                    ENEMIGO
                  </div>
                )}
              </div>

              <div className="p-4">
                <div
                  className="font-bold text-lg uppercase tracking-wide"
                  style={{ color: c.text }}
                >
                  {ch.name}
                </div>
                <div
                  className="text-xs tracking-widest uppercase mt-1"
                  style={{ color: c.textSecondary }}
                >
                  {ch.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── JUEGO ────────────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{
          backgroundColor: c.surface,
          borderTop: `2px solid ${c.border}`,
          borderBottom: `2px solid ${c.border}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl font-bold uppercase tracking-widest mb-2 text-center"
            style={{ color: c.text }}
          >
            El <span style={{ color: c.primary }}>Juego</span>
          </h2>
          <p
            className="text-center mb-10 text-sm tracking-widest uppercase"
            style={{ color: c.textSecondary }}
          >
            Toma decisiones. Sobrevive 5 minutos.
          </p>

          {/* ── Pantalla inicio ─────────────────────────────────────── */}
          {!gs.running && !gs.over && (
            <div className="text-center py-16">
              <div
                className="text-8xl font-black mb-4"
                style={{ color: c.primary, fontFamily: "'Oswald', sans-serif" }}
              >
                5:00
              </div>
              <p className="mb-8" style={{ color: c.textSecondary }}>
                Mantén la estabilidad. No dejes que EVO gane.
              </p>
              <button
                onClick={startGame}
                className="px-10 py-4 text-lg font-bold uppercase tracking-widest transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: c.primary,
                  color: "#fff",
                  letterSpacing: "0.2em",
                }}
              >
                <div className="flex items-center gap-3">
                  <Zap size={20} />
                  Asumir el mando
                </div>
              </button>
            </div>
          )}

          {/* ── Game Over ───────────────────────────────────────────── */}
          {gs.over && (
            <div className="text-center py-16">
              <div
                className="text-6xl md:text-8xl font-black mb-4 uppercase"
                style={{ color: gs.won ? "#22c55e" : c.primary }}
              >
                {gs.won ? "¡Victoria!" : "Caíste"}
              </div>
              <p
                className="text-lg mb-2"
                style={{
                  color: c.textSecondary,
                  fontFamily: "'Source Serif 4', serif",
                  fontStyle: "italic",
                }}
              >
                {gs.won
                  ? "El Presidente Paz sobrevivió. Bolivia respira."
                  : "Evo Morales ganó. El pueblo fue saqueado."}
              </p>
              <div className="flex gap-6 justify-center mb-8">
                <div style={{ color: c.textSecondary }}>
                  Casas quemadas:{" "}
                  <strong style={{ color: c.primary }}>
                    {gs.burnedHouses}
                  </strong>
                </div>
                <div style={{ color: c.textSecondary }}>
                  Estabilidad final:{" "}
                  <strong style={{ color: c.primary }}>{gs.stability}%</strong>
                </div>
              </div>
              <button
                onClick={resetGame}
                className="px-10 py-4 text-lg font-bold uppercase tracking-widest transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: c.primary, color: "#fff" }}
              >
                Reiniciar
              </button>
            </div>
          )}

          {/* ── Panel de juego ──────────────────────────────────────── */}
          {gs.running && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna izquierda: stats */}
              <div className="space-y-4">
                {/* Timer + fase */}
                <div
                  className="p-4 flex items-center justify-between"
                  style={{
                    backgroundColor: c.background,
                    border: `2px solid ${c.primary}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={20} style={{ color: c.primary }} />
                    <span
                      className="text-3xl font-black"
                      style={{ color: gs.timeLeft < 60 ? c.primary : c.text }}
                    >
                      {fmtTime(gs.timeLeft)}
                    </span>
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest px-2 py-1"
                    style={{
                      backgroundColor:
                        gs.phase === "calm"
                          ? "#22c55e22"
                          : gs.phase === "tension"
                            ? "#f59e0b22"
                            : gs.phase === "crisis"
                              ? "#f9731622"
                              : "#dc262622",
                      color:
                        gs.phase === "calm"
                          ? "#22c55e"
                          : gs.phase === "tension"
                            ? "#f59e0b"
                            : gs.phase === "crisis"
                              ? "#f97316"
                              : c.primary,
                    }}
                  >
                    {phaseLabel[gs.phase]}
                  </div>
                </div>

                {/* Barras */}
                {[
                  {
                    label: "Estabilidad",
                    val: gs.stability,
                    icon: <Shield size={14} />,
                    invert: false,
                  },
                  {
                    label: "Ponchos Rojos",
                    val: gs.ponchos,
                    icon: <GiRevolver size={14} />,
                    invert: true,
                  },
                  {
                    label: "Mineros",
                    val: gs.miners,
                    icon: <GiMiner size={14} />,
                    invert: true,
                  },
                  {
                    label: "Ciudadanos enojados",
                    val: gs.citizens,
                    icon: <Users size={14} />,
                    invert: true,
                  },
                  {
                    label: "Policía / Militares",
                    val: gs.police,
                    icon: <FaPersonMilitaryToPerson size={14} />,
                    invert: false,
                  },
                ].map((bar) => (
                  <div
                    key={bar.label}
                    style={{
                      backgroundColor: c.background,
                      border: `1px solid ${c.border}`,
                    }}
                    className="p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div
                        className="flex items-center gap-2 text-xs uppercase tracking-wider"
                        style={{ color: c.textSecondary }}
                      >
                        <span style={{ color: c.primary }}>{bar.icon}</span>
                        {bar.label}
                      </div>
                      <span
                        className="text-xs font-bold"
                        style={{ color: c.text }}
                      >
                        {bar.val}%
                      </span>
                    </div>
                    <div
                      className="h-2 w-full"
                      style={{ backgroundColor: c.border }}
                    >
                      <div
                        className="h-2 transition-all duration-700"
                        style={{
                          width: `${bar.val}%`,
                          backgroundColor: barColor(bar.val, bar.invert),
                        }}
                      />
                    </div>
                  </div>
                ))}

                {gs.burnedHouses > 0 && (
                  <div
                    className="p-3 flex items-center gap-3 text-sm"
                    style={{
                      backgroundColor: "#dc262620",
                      border: `1px solid ${c.primary}`,
                    }}
                  >
                    <Flame size={16} style={{ color: c.primary }} />
                    <span style={{ color: c.primary }}>
                      {gs.burnedHouses} casa{gs.burnedHouses > 1 ? "s" : ""}{" "}
                      policial{gs.burnedHouses > 1 ? "es" : ""} quemada
                      {gs.burnedHouses > 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>

              {/* Columna centro: acciones */}
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: c.textSecondary }}
                >
                  Decisiones del Presidente
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      id: "dialogo",
                      label: "Diálogo nacional",
                      desc: "+Estabilidad, -Tensión",
                      icon: <Users size={16} />,
                      danger: false,
                    },
                    {
                      id: "fuerza_leve",
                      label: "Fuerza moderada",
                      desc: "+Policía, +Ciudadanos enojados",
                      icon: <Shield size={16} />,
                      danger: false,
                    },
                    {
                      id: "fuerza_bruta",
                      label: "Fuerza bruta ⚠️",
                      desc: "Reduce ponchos/mineros MUCHO pero +Caos",
                      icon: <Skull size={16} />,
                      danger: true,
                    },
                    {
                      id: "negociar",
                      label: "Negociar con mineros",
                      desc: "-Mineros, +Estabilidad",
                      icon: <GiTwoCoins size={16} />,
                      danger: false,
                    },
                    {
                      id: "refuerzos",
                      label: "Llamar refuerzos",
                      desc: "+Policía, +Estabilidad",
                      icon: <FaPersonMilitaryToPerson size={16} />,
                      danger: false,
                    },
                    {
                      id: "calmar_ciudadanos",
                      label: "Cadena nacional",
                      desc: "-Ciudadanos enojados",
                      icon: <MdOutlineHowToVote size={16} />,
                      danger: false,
                    },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => action(btn.id)}
                      className="w-full text-left p-3 transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]"
                      style={{
                        backgroundColor: btn.danger
                          ? `${c.primary}15`
                          : c.background,
                        border: `1px solid ${btn.danger ? c.primary : c.border}`,
                        color: c.text,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          style={{ color: btn.danger ? c.primary : c.accent }}
                        >
                          {btn.icon}
                        </span>
                        <div>
                          <div className="font-semibold text-sm uppercase tracking-wide">
                            {btn.label}
                          </div>
                          <div
                            className="text-xs mt-0.5"
                            style={{ color: c.textSecondary }}
                          >
                            {btn.desc}
                          </div>
                        </div>
                        <ChevronRight
                          size={14}
                          className="ml-auto"
                          style={{ color: c.textSecondary }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Columna derecha: log + eventos */}
              <div className="space-y-4">
                {/* Eventos activos */}
                {gs.events.length > 0 && (
                  <div
                    style={{
                      border: `1px solid ${c.primary}`,
                      backgroundColor: c.background,
                    }}
                  >
                    <div
                      className="px-3 py-2 text-xs font-bold uppercase tracking-widest"
                      style={{ backgroundColor: c.primary, color: "#fff" }}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={12} /> Eventos activos
                      </div>
                    </div>
                    {gs.events.slice(-3).map((ev) => (
                      <div
                        key={ev.id}
                        className="px-3 py-2 text-xs border-b last:border-b-0"
                        style={{
                          borderColor: c.border,
                          color: ev.urgent ? c.primary : c.textSecondary,
                        }}
                      >
                        {ev.urgent && <span className="mr-1">🔴</span>}
                        {ev.msg}
                      </div>
                    ))}
                  </div>
                )}

                {/* Log */}
                <div
                  style={{
                    border: `1px solid ${c.border}`,
                    backgroundColor: c.background,
                  }}
                >
                  <div
                    className="px-3 py-2 text-xs font-bold uppercase tracking-widest"
                    style={{
                      backgroundColor: c.surface,
                      color: c.textSecondary,
                      borderBottom: `1px solid ${c.border}`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <BarChart2 size={12} /> Bitácora
                    </div>
                  </div>
                  <div className="p-3 space-y-1 max-h-64 overflow-y-auto">
                    {gs.log
                      .slice(-15)
                      .reverse()
                      .map((entry, i) => (
                        <div
                          key={i}
                          className="text-xs py-0.5"
                          style={{ color: i === 0 ? c.text : c.textSecondary }}
                        >
                          {entry}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CÓMO JUGAR ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2
          className="text-3xl font-bold uppercase tracking-widest mb-10 text-center"
          style={{ color: c.text }}
        >
          Cómo <span style={{ color: c.primary }}>Ganar</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <TrendingUp size={28} />,
              title: "Ruta Pacífica",
              desc: "Diálogo + Cadenas nacionales. Lento pero seguro. Los ciudadanos no se movilizan y llegas a los 5 minutos.",
              risk: "Bajo",
            },
            {
              icon: <GiShield size={28} />,
              title: "Ruta Defensiva",
              desc: "Refuerzos + Negociación con mineros. Mantén la policía fuerte. Si caen los bloqueos, la estabilidad sube.",
              risk: "Medio",
            },
            {
              icon: <Skull size={28} />,
              title: "Ruta de Fuerza",
              desc: "Fuerza bruta elimina rápido a ponchos y mineros, pero los ciudadanos se indignan y queman casas. Muy arriesgado.",
              risk: "Extremo",
            },
          ].map((r) => (
            <div
              key={r.title}
              className="p-6"
              style={{
                border: `1px solid ${c.border}`,
                backgroundColor: c.surface,
              }}
            >
              <div className="mb-4" style={{ color: c.primary }}>
                {r.icon}
              </div>
              <div
                className="font-bold text-lg uppercase tracking-wide mb-2"
                style={{ color: c.text }}
              >
                {r.title}
              </div>
              <p
                className="text-sm mb-4"
                style={{
                  color: c.textSecondary,
                  fontFamily: "'Source Serif 4', serif",
                }}
              >
                {r.desc}
              </p>
              <div
                className="text-xs uppercase tracking-widest"
                style={{ color: c.primary }}
              >
                Riesgo: {r.risk}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
