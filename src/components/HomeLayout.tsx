import type { ReactNode } from "react";
import { NavbarHome } from "./NavbarHome";
import { useTheme, themes } from "../context/ThemeContext";

export const HomeLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const c = themes[theme];

  return (
    <div 
      className="min-h-screen relative overflow-hidden transition-colors duration-300 font-sans"
      style={{ backgroundColor: c.background, color: c.text }}
    >
      {/* Dynamic ambient glowing neon orbs in background */}
      {theme === "dark" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Neon Pink Orb */}
          <div 
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[160px] opacity-25 animate-neon-pink"
            style={{ backgroundColor: c.primary }}
          />
          {/* Neon Cyan Orb */}
          <div 
            className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full blur-[180px] opacity-20 animate-neon-cyan"
            style={{ backgroundColor: c.accent }}
          />
          {/* Subtle Sunset Orange Orb */}
          <div 
            className="absolute top-[40%] right-[20%] w-[35%] h-[35%] rounded-full blur-[140px] opacity-15"
            style={{ backgroundColor: c.secondary }}
          />
          
          {/* Cyber scanline grid texture overlay */}
          <div className="absolute inset-0 gta-grid-bg opacity-[0.4]" />
        </div>
      )}

      {theme === "light" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.08]"
            style={{ backgroundColor: c.primary }}
          />
          <div 
            className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full blur-[140px] opacity-[0.08]"
            style={{ backgroundColor: c.accent }}
          />
        </div>
      )}

      <div className="relative z-10">
        <NavbarHome />
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
