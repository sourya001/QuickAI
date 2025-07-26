import React from "react";
import ReviewForm from "../components/ReviewForm";
import Testimonial from "../components/Testimonial";

export default function Reviews() {
  return (
    <div className="min-h-screen bg-tertiary-custom smooth-transition">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-custom mb-4 smooth-transition">
            Reviews & Testimonials
          </h1>
          <p className="text-lg text-secondary-custom max-w-2xl mx-auto smooth-transition">
            Share your experience and read what others have to say about our platform
          </p>
        </div>

        {/* Review Form */}
        <div className="mb-16">
          <ReviewForm />
        </div>

        {/* Testimonials Section */}
        <Testimonial />
      </div>
    </div>
  );
}
