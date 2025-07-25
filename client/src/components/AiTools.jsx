import React, { use } from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
const Aitools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24 bg-primary-custom smooth-transition">
      <div className="text-center">
        <h2 className="text-primary-custom text-[42px] font-semibold smooth-transition">
          Powerful AI Tools
        </h2>
        <p className="text-secondary-custom max-w-lg mx-auto smooth-transition">
          Everything you need to create, enchance, and optimize your content
          with cutting-edge AI technology.
        </p>
      </div>
      <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-8 m-4 max-w-xs rounded-lg bg-card-custom shadow-lg border border-custom hover:-translate-y-2 hover:shadow-xl transition-all duration-500 cursor-pointer group"
            onClick={() => user && navigate(tool.path)}
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from},${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold text-primary-custom group-hover:text-primary transition-colors duration-300 smooth-transition">{tool.title}</h3>
            <p className="text-secondary-custom text-sm max-w-[95%] group-hover:text-primary-custom transition-colors duration-300 smooth-transition">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aitools;
