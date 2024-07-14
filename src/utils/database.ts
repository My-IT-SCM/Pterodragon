import type Pterodragon from "../Pterodragon";
import mysql from "mysql2/promise";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";

export const DBManager = class {
  private client: Pterodragon;
  db: MySql2Database | null = null;

  constructor(client: Pterodragon) {
    this.client = client;
  }

  async connect() {
    const config = this.client.config;

    const connection = await mysql
      .createConnection(config.mysql)
      .catch((err) => {
        console.log("Error connecting to database: ");
        console.error(err);
      });
    if (connection) {
      console.log("Connected to database: " + config.mysql.database);
      this.db = await drizzle(connection);
    }
  }
};
