import { defineConfig } from "drizzle-kit";
import config from "./config.json";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "mysql",
  dbCredentials: config.mysql,
  verbose: true,
  strict: true
});
