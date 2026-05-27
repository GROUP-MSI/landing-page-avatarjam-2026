import type { ReactNode } from "react";
import { NavbarHome } from "./NavbarHome";

export const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-100">
      <NavbarHome />
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
};
