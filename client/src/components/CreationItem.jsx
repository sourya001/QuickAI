import React from "react";
import { useState } from "react";
const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm card-bg-custom border border-custom rounded-lg cursor-pointer hover:bg-secondary-custom smooth-transition"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-primary-custom">{item.prompt}</h2>
          <p className="text-secondary-custom">
            {item.type}-{new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full transition-colors duration-200">
          {item.type}
        </button>
      </div>
      {expanded && (
        <div>
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-md rounded-lg"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-secondary-custom">
              <div>{item.content}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
