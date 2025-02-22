import { Client } from "@libsql/client/.";

declare module "express" {
  interface Request {
    db: Client;
  }
}
