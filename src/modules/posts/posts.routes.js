import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostWithAuthor,
} from "./posts.controller.js";

const router = Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/:id/:author", getPostWithAuthor);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
