import { Router } from "express";
import {
  createComments,
  getCommentsByPost,
  updateComment,
  deleteComment,
  getComments,
} from "./comments.controller.js";

const router = Router();


router.get("/", getComments);
router.get('/:postId', getCommentsByPost);
router.post('/', createComments);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);


export default router;
