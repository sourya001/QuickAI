import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X, Home, Star } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };
  
  return (
    <>
      <div className="fixed z-50 w-full nav-bg-custom backdrop-blur-2xl flex justify-between items-center py-2 px-4 sm:px-20 border-b border-custom smooth-transition shadow-lg">
        <div className="flex items-center gap-4">
          <img
            src={assets.logo}
            alt="logo"
            className="w-32 sm:w-44 cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => navigate("/")}
          />
          <DarkModeToggle />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium -ml-32">
          <button
            onClick={() => navigate("/")}
            className="relative px-4 py-2 text-secondary-custom hover:text-primary-custom transition-colors duration-300 rounded-lg hover:bg-secondary-custom/10 group border border-secondary-custom/20 hover:border-primary-custom/40 dark:border-gray-600 dark:hover:border-primary-custom/60 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-custom/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </button>
          <button
            onClick={() => navigate("/reviews")}
            className="relative px-4 py-2 text-secondary-custom hover:text-primary-custom transition-colors duration-300 rounded-lg hover:bg-secondary-custom/10 group border border-secondary-custom/20 hover:border-primary-custom/40 dark:border-gray-600 dark:hover:border-primary-custom/60 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Reviews
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-custom/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-secondary-custom hover:text-primary-custom transition-colors duration-300 rounded-lg hover:bg-secondary-custom/10 relative group"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu 
                className={`w-6 h-6 absolute transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'rotate-180 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'
                }`} 
              />
              <X 
                className={`w-6 h-6 absolute transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : 'rotate-180 opacity-0 scale-0'
                }`} 
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-custom/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </button>
          
          {user ? (
            <div className="transition-transform duration-200 hover:scale-105">
              <UserButton />
            </div>
          ) : (
            <button
              onClick={openSignIn}
              className="relative flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 sm:px-6 py-2.5 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden group"
              style={{ color: 'white !important' }}
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="hidden sm:inline relative z-10 font-medium" style={{ color: 'white !important' }}>Get Started</span>
              <span className="sm:hidden relative z-10 font-medium" style={{ color: 'white !important' }}>Sign In</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'white !important' }} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMobileMenu}
        ></div>
        <div className={`fixed top-0 left-0 w-80 h-full nav-bg-custom backdrop-blur-2xl border-r border-custom shadow-2xl transform transition-all duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="pt-24 pb-6">
            {/* Mobile Menu Header */}
            <div className="px-6 pb-6 border-b border-custom/30">
              <h3 className="text-lg font-semibold text-primary-custom">Navigation</h3>
            </div>
            
            {/* Mobile Menu Items */}
            <div className="flex flex-col p-6 space-y-2">
              <button
                onClick={() => handleNavigation("/")}
                className="group relative text-left text-lg font-medium text-secondary-custom hover:text-primary-custom transition-colors duration-300 py-4 px-4 rounded-xl hover:bg-secondary-custom/10 border border-secondary-custom/20 hover:border-primary-custom/40 dark:border-gray-600 dark:hover:border-primary-custom/60"
              >
                <div className="flex items-center justify-between">
                  <span className="relative z-10 flex items-center gap-3">
                    <Home className="w-5 h-5" />
                    Home
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-custom/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>
              <button
                onClick={() => handleNavigation("/reviews")}
                className="group relative text-left text-lg font-medium text-secondary-custom hover:text-primary-custom transition-colors duration-300 py-4 px-4 rounded-xl hover:bg-secondary-custom/10 border border-secondary-custom/20 hover:border-primary-custom/40 dark:border-gray-600 dark:hover:border-primary-custom/60"
              >
                <div className="flex items-center justify-between">
                  <span className="relative z-10 flex items-center gap-3">
                    <Star className="w-5 h-5" />
                    Reviews
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-custom/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>
            </div>
            
            {/* Mobile Menu Footer */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs text-secondary-custom/60 text-center">
                Navigate with ease
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
