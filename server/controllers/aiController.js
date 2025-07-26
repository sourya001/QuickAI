import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan != "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "You have reached your free usage limit. Please upgrade to premium.",
      });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      maxTokens: length,
    });

    const content = response.choices[0].message.content;
    await sql`INSERT INTO creations (user_id, prompt, content, type, likes) VALUES (${userId}, ${prompt}, ${content}, 'article', '{}'::text[])`; // table name is creations

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan != "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "You have reached your free usage limit. Please upgrade to premium.",
      });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      maxTokens: 100,
    });

    const content = response.choices[0].message.content;
    // updating the data in neon database
    await sql`INSERT INTO creations (user_id, prompt, content, type, likes) VALUES (${userId}, ${prompt}, ${content}, 'blog-title', '{}'::text[])`; // table name is creations

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan != "premium") {
      return res.json({
        success: false,
        message:
          "This feature is only available for premium users. Please upgrade to premium.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY, ...formData.getHeaders() },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    // updating the data in neon database
    await sql`INSERT INTO creations (user_id, prompt, content, type, publish, likes) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${
      publish ?? false
    }, '{}'::text[])`; // table name is creations

    res.json({
      success: true,
      content: secure_url,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan != "premium") {
      return res.json({
        success: false,
        message:
          "This feature is only available for premium users. Please upgrade to premium.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    // updating the data in neon database
    await sql`INSERT INTO creations (user_id, prompt, content,type) VALUES (${userId}, 'Remove Background from Image', ${secure_url}, 'image')`; // table name is creations

    res.json({
      success: true,
      content: secure_url,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image  = req.file;
    const plan = req.plan;
    const { object } = req.body;

    if (plan != "premium") {
      return res.json({
        success: false,
        message:
          "This feature is only available for premium users. Please upgrade to premium.",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    // updating the data in neon database
    await sql`INSERT INTO creations (user_id, prompt, content,type) VALUES (${userId}, ${`Remove ${object} from Image`}, ${imageUrl}, 'image')`; // table name is creations

    res.json({
      success: true,
      content: imageUrl,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan != "premium") {
      return res.json({
        success: false,
        message:
          "This feature is only available for premium users. Please upgrade to premium.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "File size exceeds the 5MB limit.",
      });
    }
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Reviw the resume and provide feedback on its strengths and weaknesses. Provide suggestions for improvement. Here is the resume content: \n \n ${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      maxTokens: 1000,
    });

    const content = response.choices[0].message.content;

    // updating the data in neon database
    await sql`INSERT INTO creations (user_id, prompt, content,type) VALUES (${userId}, ${`Review the uploaded resume`}, ${content}, 'resume-review')`; // table name is creations

    res.json({
      success: true,
      content: content,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
