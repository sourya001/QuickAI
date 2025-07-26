import React from "react";
import { PricingTable } from "@clerk/clerk-react";
const Plan = () => {
  return (
    <div className="max-w-2xl mx-auto z-20 my-20">
      <div className="text-center ">
        <h2 className="text-primary-custom text-[42px] font-semibold smooth-transition">
          Choose Your Plan
        </h2>
        <p className="text-secondary-custom max-w-lg mx-auto smooth-transition">
          Start for free and scale effortlessly as you grow. Discover the ideal
          plan to meet your content creation needs.
        </p>
      </div>
      <div className="mt-14 max-sm:mx-8">
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
