import express, { Request, Response } from "express";
import { get_posts_by_user_id } from "../../db/dao/posts/get";
import { get_comments_for_user_post } from "../../db/dao/comments/get";

const router = express.Router();

type Post = {
  id: number;
  user_id: number;
  title: string;
  content: string;
};

// Get posts for user
router.get("/:user_id", async (req: Request, res: Response, _) => {
  const user_id = req.params.user_id;

  if (!user_id || isNaN(Number(user_id))) {
    return res
      .status(400)
      .json({ error: "Invalid user ID. It must be a number." });
  }

  try {
    const posts = await get_posts_by_user_id(req, parseInt(user_id));

    if (!posts || !posts.rows.length) {
      return res.status(500).json({ error: "Could not posts for that user" });
    }

    const res_posts = [];

    // We want to also get all comments, for the posts
    for (const post of posts.rows) {
      const comments_for_post = await get_comments_for_user_post(
        req,
        (post as unknown as Post).id,
      );

      res_posts.push([post, comments_for_post.rows]);
    }

    res.status(200).json(res_posts);
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: "Could not posts for that user" });
  }
});

export default router;
