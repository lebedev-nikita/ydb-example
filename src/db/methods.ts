import type { Session } from "ydb-sdk";
import { parse } from "./parse";

export async function createUser(session: Session) {
  await session.executeQuery(`
    INSERT INTO user 
      (user_id, name, age) 
    VALUES 
      ('${crypto.randomUUID()}', 'Nikita', 25)
  `);
}

export async function getUsers(session: Session) {
  const response = await session.executeQuery("SELECT user_id, name, age FROM user");

  return parse(response.resultSets.at(0)!, [
    ["userId", "string"],
    ["name", "string"],
    ["age", "uint32"],
  ]);
}
