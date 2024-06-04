import postsModel from "../../../db/models/post.models.js";
import userModel from "../../../db/models/user.models.js";
//================================================
//===========   createPost     =========
const createPost = async (req, res) => {
  const { title, content, author, userId } = req.body;

  try {
    const newPost = await postsModel.create({ title, content, author, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================
//===========   getAllPosts     =========
const getAllPosts = async (req, res) => {
  try {
    const posts = await postsModel.findAll({ include: userModel });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================
//=====   Get a specific post by ID     =====
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postsModel.findOne({
      where: { id },
      include: userModel,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================
//===========   updatePost     =========
const updatePost = async (req, res) => {
  const { title, content, author, userId } = req.body;
  const { id } = req.params;

  try {
    const post = await postsModel.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    await postsModel.update({ title, content, author }, { where: { id } });
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//================================================
//===========   deletePost     =========
const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await postsModel.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await postsModel.destroy({ where: { id } });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//================================================
//===========   getPostWithAuthor     =========
const getPostWithAuthor = async (req, res) => {
  const { id, author } = req.params;
  try {
    const post = await postsModel.findOne({
      where: { id: id, author: author },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================
export {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostWithAuthor,
};
