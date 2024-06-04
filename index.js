import express from "express";
import connectionDB from "./db/connectionDB.js";
import dotenv from "dotenv";
import userRouter from "./src/modules/users/users.routes.js";
import postRouter from "./src/modules/posts/posts.routes.js";
import commentRouter from "./src/modules/comments/comments.routes.js";

dotenv.config();

const app = express();
//============================================================
// ------------- Middleware -----------------
app.use(express.json());


connectionDB();
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

//------------------------------------------------------------
// error handling
app.use("*", (req, res) => {
  res.send("error");
});
//------------------------------------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("server listening on 3000"));
