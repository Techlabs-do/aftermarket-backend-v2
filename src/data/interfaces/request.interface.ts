import Stripe from 'stripe';
import { Request } from 'express';
import { AuthUser } from './auth.interface';

export interface RequestWithUser extends Request {
  user: AuthUser;
}

export interface RequestWithStripeEvent extends Request {
  rawBody: Buffer;
  event: Stripe.Event;
}
