import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

console.log("BOT_TOKEN Loaded:", !!process.env.BOT_TOKEN);
console.log("CHANNEL_ID Loaded:", !!process.env.CHANNEL_ID);

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('*'),
  BOT_TOKEN: z.string().min(1, 'BOT_TOKEN is required'),
  CHANNEL_ID: z.string().min(1, 'CHANNEL_ID is required'),
  MAX_UPLOAD_MB: z.coerce.number().default(200)
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("Environment Variable Validation Failed:", JSON.stringify(parsed.error.format(), null, 2));
  throw new Error("Missing or invalid required environment variables.");
}

export const env = parsed.data;
