import { Request } from "express";

export async function get_comments_for_user_post(req: Request, id: number) {
  // @ts-ignore db isn't correctly adding to req type
  const comments = await req.db.execute({
    sql: `
      SELECT comments.*, users.* 
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = ?
    `,
    args: [id],
  });

  return comments;
}
