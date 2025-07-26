import sql from "../configs/db.js";

// Create a new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { reviewText, rating } = req.body;
    const { userId } = req.auth;

    // Validate input
    if (!reviewText || !rating) {
      return res.status(400).json({
        success: false,
        message: "Review text and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Get user info from Clerk
    const userInfo = req.auth;
    const userName = userInfo.sessionClaims?.name || userInfo.sessionClaims?.firstName || "Anonymous User";
    const userEmail = userInfo.sessionClaims?.email || "";

    // Check if user already has a testimonial
    const existingTestimonial = await sql`
      SELECT id FROM testimonials 
      WHERE user_id = ${userId}
    `;

    if (existingTestimonial.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a testimonial",
      });
    }

    // Insert new testimonial
    const result = await sql`
      INSERT INTO testimonials (user_id, user_name, user_email, review_text, rating)
      VALUES (${userId}, ${userName}, ${userEmail}, ${reviewText}, ${rating})
      RETURNING id, created_at
    `;

    res.status(201).json({
      success: true,
      message: "Testimonial submitted successfully! It will be reviewed before appearing publicly.",
      testimonial: {
        id: result[0].id,
        userId,
        userName,
        reviewText,
        rating,
        createdAt: result[0].created_at,
      },
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all approved testimonials (public endpoint)
export const getApprovedTestimonials = async (req, res) => {
  try {
    console.log("Fetching approved testimonials...");
    
    const testimonials = await sql`
      SELECT id, user_name, review_text, rating, created_at
      FROM testimonials 
      WHERE is_approved = true 
      ORDER BY created_at DESC
      LIMIT 10
    `;

    console.log("Found testimonials:", testimonials.length);

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Debug endpoint to get all testimonials (including unapproved)
export const getAllTestimonials = async (req, res) => {
  try {
    console.log("Fetching ALL testimonials for debug...");
    
    const testimonials = await sql`
      SELECT id, user_name, review_text, rating, is_approved, created_at
      FROM testimonials 
      ORDER BY created_at DESC
    `;

    console.log("Found all testimonials:", testimonials);

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    console.error("Error fetching all testimonials:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user's own testimonial
export const getUserTestimonial = async (req, res) => {
  try {
    const { userId } = req.auth;

    const testimonial = await sql`
      SELECT id, review_text, rating, is_approved, created_at
      FROM testimonials 
      WHERE user_id = ${userId}
    `;

    if (testimonial.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No testimonial found",
      });
    }

    res.status(200).json({
      success: true,
      testimonial: testimonial[0],
    });
  } catch (error) {
    console.error("Error fetching user testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update user's testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { reviewText, rating } = req.body;
    const { userId } = req.auth;

    // Validate input
    if (!reviewText || !rating) {
      return res.status(400).json({
        success: false,
        message: "Review text and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Update testimonial and reset approval status
    const result = await sql`
      UPDATE testimonials 
      SET review_text = ${reviewText}, 
          rating = ${rating}, 
          is_approved = false,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId}
      RETURNING id
    `;

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully! It will be reviewed again before appearing publicly.",
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete user's testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { userId } = req.auth;

    const result = await sql`
      DELETE FROM testimonials 
      WHERE user_id = ${userId}
      RETURNING id
    `;

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};