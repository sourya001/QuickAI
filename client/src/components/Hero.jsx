import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import user_group from "../assets/user_group.png";
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen smooth-transition py-20 sm:py-24">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mx-auto leading-tight sm:leading-[1.2] text-primary-custom px-2">
          Craft powerful content <br className="hidden sm:block" /> using{" "}
          <span className="text-primary">AI tools</span>
        </h1>
        <p className="mt-4 sm:mt-6 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl m-auto text-sm sm:text-base text-secondary-custom px-4">
          Elevate content creation with our premium AI tools — write articles,
          generate images, and streamline your workflow.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center text-sm sm:text-base px-4">
        <button
          onClick={() => navigate("/ai")}
          className="w-full sm:w-auto bg-primary text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer font-medium"
        >
          Begin Creating Now
        </button>
        <button 
          onClick={() => window.open(import.meta.env.VITE_DEMO_VIDEO_URL, '_blank')}
          className="w-full sm:w-auto bg-primary-custom text-primary-custom px-8 sm:px-10 py-2.5 sm:py-3 rounded-lg border border-custom hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer hover:bg-secondary-custom font-medium"
        >
          Watch Demo
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 mx-auto text-secondary-custom text-xs sm:text-sm px-4">
        <img src={user_group} alt="User Group" className="h-6 sm:h-8" />
        <span className="text-center">Trusted by thousands worldwide</span>
      </div>
    </div>
  );
};

export default Hero;
