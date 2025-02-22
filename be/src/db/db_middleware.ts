import { Request, NextFunction, Response } from "express";
import { Client } from "@libsql/client";
import { initialize_db } from ".";

let db: null | Client = null;
export async function attach_db(req: Request, _: Response, next: NextFunction) {
  if (!db) {
    db = await initialize_db();
  }

  // @ts-ignore
  req.db = db;
  next();
}
