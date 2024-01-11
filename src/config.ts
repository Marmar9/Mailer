// authConfig.ts
import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

const authSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  MONGO_URL: z.string().url(),
});

const typedEnv = authSchema.parse(process.env);

export default typedEnv;
