import express, { Request, Response } from "express";
import { get_user_by_id } from "../../db/dao/users/get";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response, _) => {
  const userId = req.params.id;

  if (!userId || isNaN(Number(userId))) {
    return res
      .status(400)
      .json({ error: "Invalid user ID. It must be a number." });
  }

  try {
    const user = await get_user_by_id(req, userId);

    if (!user || !user.rows.length) {
      res.status(500).json({ error: "Could not find user for that id" });
    }

    res.json(user.rows[0]);
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: "Could not find user for that id" });
  }
});

export default router;
