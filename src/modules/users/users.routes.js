import { Router } from "express";
import {
  register,
  login,
  logout,
  getUserPostComments,
} from "./users.controller.js";

const router = Router();

router.get("/:userId/:postId", getUserPostComments);
router.post("/register", register);
router.post("/login", login);
router.delete("/logout/:id", logout);

export default router;
