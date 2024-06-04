import commentModel from "../../../db/models/comment.model.js";
import postModel from "../../../db/models/post.models.js";
import userModel from "../../../db/models/user.models.js";
//================================================
//===========   getComments     =========
const getComments = async (req, res, next) => {
  const comments = await commentModel.findAll();
  res.status(200).json({ msg: "done", comments });
};
//================================================
//===========   createComments     =========
const createComments = async (req, res) => {
  const { content, userId, postId } = req.body;
  try {
    const comments = await commentModel.create({ content, userId, postId });
    res
      .status(201)
      .json({ message: "comments created successfully", comments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//================================================
//===========   Get all comments for a post     =========
const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await commentModel.findAll({
      where: { postId },
      include: [userModel, postModel],
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================
//===========   UpdateComment     =========
const updateComment = async (req, res) => {
  const { content, userId } = req.body;
  const { id } = req.params;

  try {
    const comment = await commentModel.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this comment" });
    }

    await commentModel.update({ content }, { where: { id } });
    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================
//===========   deleteComment     =========
const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const comment = await commentModel.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }

    await commentModel.destroy({ where: { id } });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================
export {
  getComments,
  createComments,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
