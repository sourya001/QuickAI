import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle,generateBlogTitle,generateImage } from "../controllers/aiController.js";
import {upload} from "../configs/multer.js";
import { removeImageBackground,removeImageObject,resumeReview } from "../controllers/aiController.js";
const aiRouter = express.Router();

aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post("/generate-blog-title", auth, generateBlogTitle);
aiRouter.post("/generate-image", auth, generateImage);
aiRouter.post("/remove-image-background",upload.single('image  '), auth, removeImageBackground);
aiRouter.post("/remove-image-object", upload.single('image'), auth, removeImageObject); // Assuming the same controller is used for both
aiRouter.post("/resume-review", upload.single('resume'), auth, resumeReview); // Assuming the same controller is used for both

export default aiRouter;
