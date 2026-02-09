import React from "react";
import { PricingTable } from "@clerk/clerk-react";
const Plan = () => {
  return (
    <div className="max-w-2xl mx-auto z-20 my-12 sm:my-16 md:my-20 px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-primary-custom text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold smooth-transition">
          Choose Your Plan
        </h2>
        <p className="text-secondary-custom text-sm sm:text-base max-w-lg mx-auto mt-2 sm:mt-4 smooth-transition">
          Start for free and scale effortlessly as you grow. Discover the ideal
          plan to meet your content creation needs.
        </p>
      </div>
      <div className="mt-8 sm:mt-12 md:mt-14">
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
