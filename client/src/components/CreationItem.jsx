import React from "react";
import { useState } from "react";
const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-3 sm:p-4 w-full max-w-5xl text-xs sm:text-sm card-bg-custom border border-custom rounded-lg cursor-pointer hover:bg-secondary-custom smooth-transition"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-sm sm:text-base text-primary-custom truncate sm:whitespace-normal">{item.prompt}</h2>
          <p className="text-xs sm:text-sm text-secondary-custom mt-1">
            {item.type}-{new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 px-3 sm:px-4 py-1 rounded-full transition-colors duration-200 text-xs sm:text-sm flex-shrink-0">
          {item.type}
        </button>
      </div>
      {expanded && (
        <div className="mt-3">
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="image"
                className="w-full max-w-md rounded-lg mx-auto"
              />
            </div>
          ) : (
            <div className="h-full overflow-y-scroll text-xs sm:text-sm text-secondary-custom">
              <div>{item.content}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
