import React, { use } from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar"; // <-- Import your Sidebar component
import { useState } from "react";
import { useUser , SignIn} from "@clerk/clerk-react";
import DarkModeToggle from "../components/DarkModeToggle";
import Navbar from "../components/Navbar";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <>
      <Navbar />
      <div className="flex items-start justify-start h-screen bg-primary-custom text-primary-custom smooth-transition pt-20">
        <div className="w-full flex">
          <div className="sm:hidden absolute top-24 right-4 z-40">
            {sidebar ? (
              <X
                onClick={() => setSidebar(false)}
                className="h-6 w-6 text-secondary-custom smooth-transition"
              />
            ) : (
              <Menu
                onClick={() => setSidebar(true)}
                className="h-6 w-6 text-secondary-custom smooth-transition"
              />
            )}
          </div>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          <div className="flex-1 bg-tertiary-custom smooth-transition">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center h-screen bg-primary-custom text-primary-custom smooth-transition">
      <SignIn />
    </div>
  );
};

export default Layout;
