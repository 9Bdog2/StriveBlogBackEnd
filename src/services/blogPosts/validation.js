import { body } from "express-validator";

export const postBlogValidation = [
  body("title").exists().withMessage("Title is required"),
  body("content").exists().withMessage("Content is required"),
  body("category").exists().withMessage("Category is required"),
];
