import React, { use } from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
const Aitools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 my-12 sm:my-16 md:my-20 lg:my-24 bg-primary-custom smooth-transition">
      <div className="text-center px-4">
        <h2 className="text-primary-custom text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold smooth-transition">
          Powerful AI Tools
        </h2>
        <p className="text-secondary-custom text-sm sm:text-base max-w-lg mx-auto mt-2 sm:mt-4 smooth-transition">
          Everything you need to create, enhance, and optimize your content
          with cutting-edge AI technology.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-10 justify-items-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="w-full max-w-xs p-6 sm:p-8 rounded-lg bg-card-custom shadow-lg border border-custom hover:-translate-y-2 hover:shadow-xl transition-all duration-500 cursor-pointer group"
            onClick={() => user && navigate(tool.path)}
          >
            <tool.Icon
              className="w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-3 text-white rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from},${tool.bg.to})`,
              }}
            />
            <h3 className="mt-4 sm:mt-6 mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-primary-custom group-hover:text-primary transition-colors duration-300 smooth-transition">
              {tool.title}
            </h3>
            <p className="text-secondary-custom text-xs sm:text-sm group-hover:text-primary-custom transition-colors duration-300 smooth-transition">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aitools;
