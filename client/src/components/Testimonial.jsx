import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import customToast from "../utils/toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const StarIcon = ({ filled }) => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.524.464a.5.5 0 0 1 .952 0l1.432 4.41a.5.5 0 0 0 .476.345h4.637a.5.5 0 0 1 .294.904L11.563 8.85a.5.5 0 0 0-.181.559l1.433 4.41a.5.5 0 0 1-.77.559L8.294 11.65a.5.5 0 0 0-.588 0l-3.751 2.726a.5.5 0 0 1-.77-.56l1.433-4.41a.5.5 0 0 0-.181-.558L.685 6.123A.5.5 0 0 1 .98 5.22h4.637a.5.5 0 0 0 .476-.346z"
      fill={filled ? "#FF532E" : "#D1D5DB"}
    />
  </svg>
);

const TestimonialCard = ({ testimonial }) => {
  const { user_name, review_text, rating, created_at } = testimonial;
  
  // Generate a consistent avatar color based on user name
  const getAvatarColor = (name) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-green-500 to-green-600", 
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
      "bg-gradient-to-br from-indigo-500 to-indigo-600",
      "bg-gradient-to-br from-red-500 to-red-600",
      "bg-gradient-to-br from-yellow-500 to-yellow-600",
      "bg-gradient-to-br from-teal-500 to-teal-600"
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full h-80 flex flex-col items-start border border-gray-200/50 dark:border-gray-700/50 p-6 rounded-xl bg-white dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl dark:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1 group mx-auto max-w-sm">
      <div className="relative">
        <svg
          width="44"
          height="40"
          viewBox="0 0 44 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        >
          <path
            d="M33.172 5.469q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 26.539 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.923-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203m-20.625 0q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 5.914 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.922-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203"
            fill="currentColor"
            className="text-blue-500 dark:text-blue-400"
          />
        </svg>
      </div>
      
      <div className="flex items-center justify-center mt-4 gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="transition-transform duration-200 hover:scale-110">
            <StarIcon filled={star <= rating} />
          </div>
        ))}
      </div>
      
      <div className="flex-1 flex flex-col justify-between mt-4 w-full">
        <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed line-clamp-4 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300 overflow-hidden">
          {review_text.length > 120 ? `${review_text.substring(0, 120)}...` : review_text}
        </p>
        
        <div className="flex items-center gap-3 mt-4 w-full">
          <div className={`h-12 w-12 rounded-full ${getAvatarColor(user_name)} flex items-center justify-center text-white font-semibold text-lg shadow-lg transition-transform duration-300 group-hover:scale-105 flex-shrink-0`}>
            {user_name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base text-gray-900 dark:text-gray-100 font-medium smooth-transition group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
              {user_name}
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 smooth-transition opacity-75 group-hover:opacity-100">
              {formatDate(created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Testimonial({ showWriteReviewButton = true }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [testimonials, setTestimonials] = useState([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Function to get random testimonials based on screen size
  const getRandomTestimonials = (testimonialsArray, count) => {
    if (testimonialsArray.length <= count) {
      return testimonialsArray;
    }
    
    const shuffled = [...testimonialsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Determine how many testimonials to show based on screen size
  const getTestimonialCount = () => {
    return windowWidth < 768 ? 1 : 3; // Show 1 on mobile, 3 on desktop
  };

  useEffect(() => {
    if (testimonials.length > 0) {
      const count = getTestimonialCount();
      setDisplayedTestimonials(getRandomTestimonials(testimonials, count));
    }
  }, [testimonials, windowWidth]);

  // Handle "Show More Reviews" button click
  const handleShowMore = () => {
    const count = getTestimonialCount();
    setDisplayedTestimonials(getRandomTestimonials(testimonials, count));
  };

  // Handle "Write a Review" button click with authentication check
  const handleWriteReview = () => {
    if (!user) {
      customToast.error("Please sign in first to write a review");
      return;
    }
    navigate("/reviews");
  };

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("/api/testimonials/public");
      if (response.data.success) {
        setTestimonials(response.data.testimonials);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      customToast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-32 mb-24 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-custom smooth-transition">
          What Our Users Say
        </h1>
        <div className="flex justify-center mt-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mt-32 mb-24 px-4">
      <div className="max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-custom smooth-transition mb-4">
          What Our Users Say
        </h1>
        <p className="text-sm md:text-base text-secondary-custom smooth-transition opacity-80">
          Real reviews from our amazing community members
        </p>
      </div>
      
      {displayedTestimonials.length === 0 ? (
        <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
          <p className="text-secondary-custom">
            No testimonials yet. Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mt-16 text-left">
          {displayedTestimonials.map((testimonial, index) => (
            <div 
              key={`${testimonial.id}-${index}`} 
              className="animate-fade-in w-full max-w-sm md:w-80"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
        {testimonials.length > getTestimonialCount() && (
          <button
            onClick={handleShowMore}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
          >
            Show More Reviews
          </button>
        )}
        
        {showWriteReviewButton && (
          <button
            onClick={handleWriteReview}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800"
          >
            Write a Review
          </button>
        )}
      </div>
    </div>
  );
}
