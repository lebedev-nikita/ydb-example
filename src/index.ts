import { driver } from "./db/driver";
import { getUsers } from "./db/methods";

try {
  await driver.tableClient.withSession(async (session) => {
    // await createUser(session);
    console.log(JSON.stringify(await getUsers(session), null, 2));
  });
} finally {
  await driver.destroy();
}
