import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import customToast from "../utils/toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const StarRating = ({ rating, setRating, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (value) => {
    if (!readonly) {
      setRating(value);
    }
  };

  const handleStarHover = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleStarLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleStarLeave}
          disabled={readonly}
          className={`transition-all duration-200 ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          <svg
            width="24"
            height="23"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.524.464a.5.5 0 0 1 .952 0l1.432 4.41a.5.5 0 0 0 .476.345h4.637a.5.5 0 0 1 .294.904L11.563 8.85a.5.5 0 0 0-.181.559l1.433 4.41a.5.5 0 0 1-.77.559L8.294 11.65a.5.5 0 0 0-.588 0l-3.751 2.726a.5.5 0 0 1-.77-.56l1.433-4.41a.5.5 0 0 0-.181-.558L.685 6.123A.5.5 0 0 1 .98 5.22h4.637a.5.5 0 0 0 .476-.346z"
              fill={
                star <= (hoverRating || rating)
                  ? "#FF532E"
                  : "#D1D5DB"
              }
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default function ReviewForm() {
  const { getToken, isSignedIn } = useAuth();
  const [formData, setFormData] = useState({
    reviewText: "",
    rating: 0,
  });
  const [existingReview, setExistingReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingReview, setFetchingReview] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      fetchUserReview();
    }
  }, [isSignedIn]);

  const fetchUserReview = async () => {
    try {
      const response = await axios.get("/api/testimonials/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      
      if (response.data.success) {
        setExistingReview(response.data.testimonial);
        setFormData({
          reviewText: response.data.testimonial.review_text,
          rating: response.data.testimonial.rating,
        });
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error("Error fetching user review:", error);
      }
    } finally {
      setFetchingReview(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.reviewText.trim()) {
      customToast.error("Please write a review");
      return;
    }
    
    if (formData.rating === 0) {
      customToast.error("Please select a rating");
      return;
    }

    setLoading(true);
    
    try {
      let response;
      if (existingReview) {
        response = await axios.put("/api/testimonials/update", formData, {
          headers: { Authorization: `Bearer ${await getToken()}` },
        });
      } else {
        response = await axios.post("/api/testimonials/create", formData, {
          headers: { Authorization: `Bearer ${await getToken()}` },
        });
      }

      if (response.data.success) {
        customToast.success(response.data.message);
        if (!existingReview) {
          setExistingReview({ ...formData, is_approved: false });
        } else {
          setExistingReview({ ...existingReview, ...formData, is_approved: false });
        }
        setIsEditing(false);
      }
    } catch (error) {
      customToast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your review?")) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.delete("/api/testimonials/delete", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (response.data.success) {
        customToast.success("Review deleted successfully");
        setExistingReview(null);
        setFormData({ reviewText: "", rating: 0 });
        setIsEditing(false);
      }
    } catch (error) {
      customToast.error(error.response?.data?.message || "Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (existingReview) {
      setFormData({
        reviewText: existingReview.review_text,
        rating: existingReview.rating,
      });
    } else {
      setFormData({ reviewText: "", rating: 0 });
    }
    setIsEditing(false);
  };

  if (!isSignedIn) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-card-custom rounded-lg border border-custom smooth-transition">
        <h2 className="text-2xl font-bold text-primary-custom mb-4 smooth-transition">
          Share Your Experience
        </h2>
        <p className="text-secondary-custom smooth-transition">
          Please sign in to write a review and share your experience with our platform.
        </p>
      </div>
    );
  }

  if (fetchingReview) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-card-custom rounded-lg border border-custom smooth-transition">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card-custom rounded-lg border border-custom smooth-transition">
      <h2 className="text-2xl font-bold text-primary-custom mb-4 smooth-transition">
        {existingReview ? "Your Review" : "Share Your Experience"}
      </h2>

      {existingReview && !isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-custom mb-2 smooth-transition">
              Your Rating
            </label>
            <StarRating rating={existingReview.rating} readonly={true} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-custom mb-2 smooth-transition">
              Your Review
            </label>
            <p className="text-primary-custom bg-tertiary-custom p-4 rounded-lg border border-custom smooth-transition">
              {existingReview.review_text}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              existingReview.is_approved 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {existingReview.is_approved ? 'Approved' : 'Pending Approval'}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors smooth-transition"
            >
              Edit Review
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 smooth-transition"
            >
              {loading ? "Deleting..." : "Delete Review"}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-custom mb-2 smooth-transition">
              Rating *
            </label>
            <StarRating 
              rating={formData.rating} 
              setRating={(rating) => setFormData({ ...formData, rating })} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-custom mb-2 smooth-transition">
              Your Review *
            </label>
            <textarea
              value={formData.reviewText}
              onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
              placeholder="Share your experience with our platform..."
              rows={6}
              className="w-full p-4 border border-custom rounded-lg bg-tertiary-custom text-primary-custom placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent smooth-transition resize-none"
              required
            />
            <p className="text-xs text-secondary-custom mt-2 smooth-transition">
              Your review will be reviewed before appearing publicly.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 smooth-transition"
            >
              {loading 
                ? (existingReview ? "Updating..." : "Submitting...") 
                : (existingReview ? "Update Review" : "Submit Review")
              }
            </button>
            
            {existingReview && isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors smooth-transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
