import { Driver, getCredentialsFromEnv, getLogger } from "ydb-sdk";
import { z } from "zod";

const endpoint = "grpcs://ydb.serverless.yandexcloud.net:2135";
const database = "/ru-central1/b1gchqatfiui72feih8u/etnslu7k70it53q95m76";
const authService = getCredentialsFromEnv();
const logger = getLogger({ level: "debug" });

const driver = new Driver({ endpoint, database, authService });

if (!(await driver.ready(10000))) {
  logger.fatal(`Driver has not become ready in 10 seconds!`);
  process.exit(1);
}

async function getNum() {
  const result = await driver.tableClient.withSession(async (session) => {
    return await session.executeQuery("SELECT 1 as num");
  });

  const schema = z.object({ num: z.number() });

  return result.resultSets[0]?.rows
    ?.map((row) => ({
      num: row.items?.at(0)?.int32Value,
    }))
    .map((row) => schema.parse(row));
}

console.log(await getNum());

await driver.destroy();
