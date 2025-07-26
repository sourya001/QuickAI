import React, { use } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  
  return (
    <div className="fixed z-50 w-full nav-bg-custom backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 cursor-pointer border-b border-custom smooth-transition">
      <img
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <button
          onClick={() => navigate("/")}
          className="text-secondary-custom hover:text-primary-custom transition-colors smooth-transition"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/reviews")}
          className="text-secondary-custom hover:text-primary-custom transition-colors smooth-transition"
        >
          Reviews
        </button>
        {user && (
          <button
            onClick={() => navigate("/ai")}
            className="text-secondary-custom hover:text-primary-custom transition-colors smooth-transition"
          >
            Dashboard
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <DarkModeToggle />
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5 hover:bg-primary-dark transition-colors duration-300"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
