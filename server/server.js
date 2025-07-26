import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./configs/cloudinary.js";
import { requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import testimonialRouter from "./routes/testimonialRoutes.js";
import { getApprovedTestimonials, getAllTestimonials } from "./controllers/testimonialController.js";

const app = express();
await connectCloudinary();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is Live!"));

// Public routes (no auth required) - specific route first
app.get("/api/testimonials/public", getApprovedTestimonials);
app.get("/api/testimonials/debug", getAllTestimonials);

// Protected routes (auth required)
app.use(requireAuth());
app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);
app.use("/api/testimonials", testimonialRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
