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
      className="flex items-center justify-center h-screen w-screen"
      style={{ background: colors.background }}
    >
      <div className="relative flex items-center justify-center">
        {/* Spinning arc canvas */}
        <canvas ref={canvasRef} width={300} height={300} className="absolute" />

        {/* Logo with pulse animation */}
        <img
          src={logo}
          alt="The msi logo"
          className="relative z-10 whatelbot-logo-pulse"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
      </div>

      <style>{`
        @keyframes whatelbot-pulse {
          0%, 100% { transform: scale(0.7); }
          50% { transform: scale(1.0); }
        }
        .whatelbot-logo-pulse {
          animation: whatelbot-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
