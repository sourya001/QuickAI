import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import user_group from "../assets/user_group.png";
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen smooth-transition">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2] text-primary-custom">
          Craft powerful content <br /> using{" "}
          <span className="text-primary">AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-secondary-custom">
          Elevate content creation with our premium AI tools — write articles,
          generate images, and streamline your workflow.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          Begin Creating Now
        </button>
        <button 
          onClick={() => window.open(import.meta.env.VITE_DEMO_VIDEO_URL, '_blank')}
          className="bg-primary-custom text-primary-custom px-10 py-3 rounded-lg border border-custom hover:scale-102 active:scale-95 transition-all duration-300 cursor-pointer hover:bg-secondary-custom"
        >
          Watch Demo
        </button>
      </div>
      <div className="flex items-center gap-4 mt-8 mx-auto text-secondary-custom">
        <img src={user_group} alt="User Group" className="h-8" />
        Trusted by thousands worldwide
      </div>
    </div>
  );
};

export default Hero;
