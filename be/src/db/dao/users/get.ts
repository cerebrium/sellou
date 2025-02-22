import { Request } from "express";

export async function get_user_by_id(req: Request, id: string) {
  // @ts-ignore db isn't correctly adding to req type
  const user = await req.db.execute({
    sql: "SELECT * from users where id = ?",
    args: [id],
  });

  return user;
}
