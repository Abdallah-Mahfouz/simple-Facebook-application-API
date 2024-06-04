import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.models.js";

const postModel = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
  },
});
userModel.hasMany(postModel, { foreignKey: "userId" });
postModel.belongsTo(userModel, { foreignKey: "userId" });

export default postModel;
