import express from "express";
import {
  createTestimonial,
  getApprovedTestimonials,
  getUserTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

const testimonialRouter = express.Router();

// Public route - get approved testimonials
testimonialRouter.get("/public", getApprovedTestimonials);

// Protected routes - require authentication
testimonialRouter.post("/create", createTestimonial);
testimonialRouter.get("/user", getUserTestimonial);
testimonialRouter.put("/update", updateTestimonial);
testimonialRouter.delete("/delete", deleteTestimonial);

export default testimonialRouter;