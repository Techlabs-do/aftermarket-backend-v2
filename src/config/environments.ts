// import { config } from 'dotenv';
import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  PORT,
  ORIGIN,
  LOG_DIR,
  NODE_ENV,
  LOG_FORMAT,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_USER_PASSWORD,
  AUTH0_CLIENT_SECRET,
  AUTH0_CONNECTION_ID,
  STRIPE_SECRET_KEY,
  STRIPE_CHECKOUT_CALLBACK_URL,
  STRIPE_CHECKOUT_COMPLETE_BILLING_SIGNING_SECRET,
  STRIPE_PRODUCT_ID_FOR_MONTHLY_SUBSCRIPTION,
  STRIPE_PRODUCT_ID_FOR_YEARLY_SUBSCRIPTION,
  CONTAINER_NAME,
  ACCOUNT_KEY,
  ACCOUNT_NAME,
  SENTRY_DSN,
} = process.env;
