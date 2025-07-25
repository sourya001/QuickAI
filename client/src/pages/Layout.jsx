import React, { use } from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar"; // <-- Import your Sidebar component
import { useState } from "react";
import { useUser , SignIn} from "@clerk/clerk-react";
import DarkModeToggle from "../components/DarkModeToggle";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col items-start justify-start h-screen bg-primary-custom text-primary-custom smooth-transition">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-custom bg-primary-custom smooth-transition">
        <img className="cursor-pointer w-32 sm:w-44" src={assets.logo} alt="" onClick={() => navigate("/")} />
        
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className="h-6 w-6 text-secondary-custom sm:hidden smooth-transition"
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className="h-6 w-6 text-secondary-custom sm:hidden smooth-transition"
            />
          )}
        </div>
      </nav>
      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-tertiary-custom smooth-transition">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-primary-custom text-primary-custom smooth-transition">
      <SignIn />
    </div>
  )
};

export default Layout;
