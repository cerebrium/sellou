import express, { Request, Response } from "express";
import { get_comments_for_user_post } from "../../db/dao/comments/get";

const router = express.Router();

router.get("/:post_id", async (req: Request, res: Response, _) => {
  const post_id = req.params.post_id;

  if (!post_id || isNaN(Number(post_id))) {
    return res
      .status(400)
      .json({ error: "Invalid user ID. It must be a number." });
  }

  try {
    const comments = await get_comments_for_user_post(req, parseInt(post_id));
    res.json(comments);
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: "Could not find user for that id" });
  }
});

export default router;
