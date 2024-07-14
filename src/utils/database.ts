import type Pterodragon from "../Pterodragon";
import mysql from "mysql2/promise";

export const DBManager = class {
  private client: Pterodragon;
  
  constructor(client: Pterodragon) {
    this.client = client;
  }

  async connect() {
    const config = this.client.config;

    const connection = await mysql.createConnection(config.mysql);
    const db  = drizzle
  }
};
