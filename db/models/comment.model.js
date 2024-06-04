import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.models.js";
import postModel from "./post.models.js";

const commentModel = sequelize.define("Comment", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: postModel,
      key: "id",
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
    allowNull: false,
  },
});

userModel.hasMany(
  commentModel,
  { foreignKey: "userId" },
  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  }
);
commentModel.belongsTo(userModel, { foreignKey: "userId" });

postModel.hasMany(
  commentModel,
  { foreignKey: "postId" },
  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  }
);
commentModel.belongsTo(postModel, { foreignKey: "postId" });

export default commentModel;
