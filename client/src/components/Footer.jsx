import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import customToast from "../utils/toast";

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      customToast.error("Please enter your email address");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      customToast.error("Please enter a valid email address");
      return;
    }

    // Show success toast
    customToast.success("You are successfully subscribed!");

    // Reset the email input
    setEmail("");
  };

  return (
    <footer className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pt-12 sm:pt-16 pb-6 sm:pb-8 w-full text-secondary-custom bg-primary-custom smooth-transition border-t border-custom">
      <div className="flex flex-col md:flex-row justify-between w-full gap-8 sm:gap-10 border-b border-custom pb-6 sm:pb-8">
        <div className="md:max-w-96">
          <img
            className="w-28 sm:w-32 md:w-44 cursor-pointer"
            src={assets.logo}
            alt="QuickAI Logo"
            onClick={() => navigate("/")}
          />
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-secondary-custom">
            Elevate your content creation with our premium AI tools. Write
            articles, generate images, remove backgrounds, and streamline your
            workflow with the power of artificial intelligence.
          </p>
          <p className="mt-3 sm:mt-4 text-xs text-secondary-custom">
            Trusted by thousands worldwide for professional content creation.
          </p>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row items-start md:justify-end gap-8 sm:gap-12 md:gap-16 lg:gap-20 mt-6 md:mt-0">
          <div>
            <h2 className="font-semibold mb-5 text-primary-custom">AI Tools</h2>
            <ul className="text-sm space-y-3">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/ai/write-article");
                  }}
                  className="text-secondary-custom hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  AI Article Writer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/ai/blog-titles");
                  }}
                  className="text-secondary-custom hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  Blog Title Generator
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/ai/generate-images");
                  }}
                  className="text-secondary-custom hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  AI Image Generation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/ai/remove-background");
                  }}
                  className="text-secondary-custom hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  Background Removal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/ai/remove-object");
                  }}
                  className="text-secondary-custom hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  Object Removal
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-primary-custom">Company</h2>
            <ul className="text-sm space-y-3">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  className="text-secondary-custom hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/community");
                  }}
                  className="text-secondary-custom hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/dashboard");
                  }}
                  className="text-secondary-custom hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-custom hover:text-primary transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-custom hover:text-primary transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-primary-custom mb-5">
              Stay Updated
            </h2>
            <div className="text-sm space-y-2">
              <p className="text-secondary-custom">
                Get the latest updates on new AI tools and features delivered to
                your inbox.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4 w-full sm:w-auto">
                <input
                  className="border border-custom placeholder-secondary-custom focus:ring-2 ring-primary focus:border-primary outline-none w-full sm:max-w-64 h-10 rounded-lg px-3 bg-primary-custom text-primary-custom smooth-transition text-sm"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSubscribe(e)}
                />
                <button
                  className="bg-primary hover:bg-primary-dark w-full sm:w-auto sm:min-w-24 h-10 text-white rounded-lg transition-colors duration-200 font-medium text-sm px-4 sm:px-6"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-center sm:text-left text-xs md:text-sm text-secondary-custom">
          © 2025 QuickAI. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs md:text-sm">
          <a
            href="#"
            className="text-secondary-custom hover:text-primary transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-secondary-custom hover:text-primary transition-colors duration-200"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-secondary-custom hover:text-primary transition-colors duration-200"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
