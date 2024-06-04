import bcrypt from "bcryptjs";
import userModel from "../../../db/models/user.models.js";
import postModel from "../../../db/models/post.models.js";
import commentModel from "../../../db/models/comment.model.js";
import { where } from "sequelize";
//================================================
//===========   register     =========
const register = async (req, res) => {
  const { name, email, age, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      age,
      password: hashedPassword,
      tokken: "",
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================
//===========   login     =========
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================
//===========   logout     =========
const logout = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.destroy({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================================
//==== Get user with specific post and post's comments ====
const getUserPostComments = async (req, res) => {
  const { userId, postId } = req.params;

  try {
    const user = await userModel.findByPk(userId, {
      include: {
        model: postModel,
        where: { id: postId },
        include: commentModel,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User or Post not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//================================================================

export { register, login, logout, getUserPostComments };
