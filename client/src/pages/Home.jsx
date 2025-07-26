import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Testimonial from "../components/Testimonial";
import Plan from "../components/Plan";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AiTools />
      
      {/* Separator between AI Tools and Plan */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary-custom/30 to-transparent dark:via-gray-600/50"></div>
      
      <Plan />
      
      {/* Separator between Plan and Testimonials */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary-custom/30 to-transparent dark:via-gray-600/50"></div>
      
      <Testimonial />
      <Footer />
    </>
  );
};

export default Home;
