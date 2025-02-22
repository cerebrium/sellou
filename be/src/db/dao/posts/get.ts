import { Request } from "express";

export async function get_posts_by_user_id(req: Request, id: number) {
  // @ts-ignore db isn't correctly adding to req type
  const posts = await req.db.execute({
    sql: "SELECT * from posts where user_id = ?",
    args: [id],
  });

  return posts;
}
