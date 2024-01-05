// import { config } from 'dotenv';
import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  PORT,
  REGION,
  BUCKET,
  BUCKET_ENDPOINT,
  ORIGIN,
  LOG_DIR,
  NODE_ENV,
  LOG_FORMAT,
  JWT_SECRET,
  SECRET_KEY_HEADER,
} = process.env;
