import { Column, TableDescription, Types } from "ydb-sdk";
import { driver } from "../driver";

await driver.tableClient.withSession(async (session) => {
  // await session.dropTable("user");
  await session.createTable(
    "user",
    new TableDescription()
      .withColumns(
        new Column("user_id", Types.UTF8),
        new Column("name", Types.UTF8),
        new Column("age", Types.UINT32),
      )
      .withPrimaryKey("user_id"),
  );
});
