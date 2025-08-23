import type { ReactNode } from "react";
import Navbar from "./Navbar";
import type React from "react";


interface LayoutProps{
  children:ReactNode;
}

const Layout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex-1 p-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;