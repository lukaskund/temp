import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

loadEnv();

const defaults = {
  BASE_URL: 'http://127.0.0.1:4173/',
  TEST_USER_EMAIL: 'test@pawshop.com',
  TEST_USER_PASSWORD: 'password123',
} as const;

function orDefault(value: string | undefined, fallback: string): string {
  return value && value.trim() !== '' ? value : fallback;
}

const envSchema = z.object({
  BASE_URL: z.string().url(),
  TEST_USER_EMAIL: z.string().email(),
  TEST_USER_PASSWORD: z.string().min(1),
});

export const env = envSchema.parse({
  BASE_URL: orDefault(process.env.BASE_URL, defaults.BASE_URL),
  TEST_USER_EMAIL: orDefault(process.env.TEST_USER_EMAIL, defaults.TEST_USER_EMAIL),
  TEST_USER_PASSWORD: orDefault(process.env.TEST_USER_PASSWORD, defaults.TEST_USER_PASSWORD),
});
