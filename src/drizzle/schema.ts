import { mysqlTable, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    token: varchar("token", { length: 256 }),
  },
  (user) => ({
    idIndex: uniqueIndex("id").on(user.id),
  })
);
