import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/utils/database/schema.ts",
  out: "./generated/database",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
