import { useEffect, useRef } from "react";
import { useTheme, themes } from "../context/ThemeContext";
import logo from "../assets/logo.png";

export const AsaLoading = () => {
  const { theme } = useTheme();
  const colors = themes[theme];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = canvas.width;
    const center = SIZE / 2;
    const radius = (SIZE / 2) * 0.85;

    const loop = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000; // seconds
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Background arc
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = `${colors.primary}33`;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.stroke();

      // Rotating arc
      const rotation = elapsed * Math.PI; // full spin in 2s
      const startAngle = -0.5 * Math.PI + rotation;
      const sweepAngle = Math.PI;

      const grad = ctx.createConicGradient(startAngle, center, center);
      grad.addColorStop(0, colors.primary);
      grad.addColorStop(0.5, colors.accent);
      grad.addColorStop(1, colors.primary);

      ctx.beginPath();
      ctx.arc(center, center, radius, startAngle, startAngle + sweepAngle);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.stroke();

      // Dot at end of arc
      const dotX = center + radius * Math.cos(startAngle + sweepAngle);
      const dotY = center + radius * Math.sin(startAngle + sweepAngle);
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, 2 * Math.PI);
      ctx.fillStyle = colors.primary;
      ctx.fill();

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [colors]);

  // Pulse scale: oscillates between 0.7 and 1.0 every 2s
  // Using CSS animation for the logo scale
  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen relative overflow-hidden gta-scanlines"
      style={{ background: colors.background }}
    >
      {/* Background glowing orb */}
      <div 
        className="absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-20 animate-pulse pointer-events-none"
        style={{ backgroundColor: colors.primary }}
      />
      
      <div className="relative flex items-center justify-center mb-8">
        {/* Spinning arc canvas */}
        <canvas ref={canvasRef} width={280} height={280} className="absolute" />

        {/* Logo with pulse animation and drop shadow */}
        <div className="relative z-10 p-4 bg-zinc-950/40 backdrop-blur-sm border border-white/5 rounded-full">
          <img
            src={logo}
            alt="The msi logo"
            className="whatelbot-logo-pulse"
            style={{ width: 70, height: 70, objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Military Cyber loading label */}
      <div className="text-center relative z-10 flex flex-col items-center">
        <span className="font-display font-black text-xs tracking-[0.3em] uppercase text-gta-pink animate-pulse">
          INICIALIZANDO TERMINAL
        </span>
        <span className="font-mono text-[10px] tracking-[0.15em] text-white/40 uppercase mt-2">
          f(x) = argmax E[R | pi] // SISTEMA ACTIVO
        </span>
      </div>

      <style>{`
        @keyframes whatelbot-pulse {
          0%, 100% { transform: scale(0.85); filter: drop-shadow(0 0 5px rgba(255, 42, 133, 0.2)); }
          50% { transform: scale(1.0); filter: drop-shadow(0 0 15px rgba(255, 42, 133, 0.4)); }
        }
        .whatelbot-logo-pulse {
          animation: whatelbot-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
