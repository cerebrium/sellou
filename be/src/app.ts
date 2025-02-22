import express from "express";
import cors from "cors";
import { attach_db } from "./db/db_middleware";
import { userRoutes } from "./routes/users";
import { postsRoutes } from "./routes/posts";
import { commentsRoutes } from "./routes/comments";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Add our sqlite db
app.use(attach_db);

app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
