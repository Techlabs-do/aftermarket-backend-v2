import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@data/exceptions/http_exception';

/**
 * @name HeaderValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
export const HeaderValidationMiddleware = (key: string, errorMessage: string, matchKey?: string) => {
  return (req: Request, _: Response, next: NextFunction) => {
    if (req.headers[key]) {
      if (req.headers[key] === matchKey) {
        next();
      } else if (req.headers[key] !== matchKey) {
        next(new HttpException(400, "Key value doesn't match"));
      } else {
        next();
      }
    } else {
      next(new HttpException(400, errorMessage));
    }
  };
};
