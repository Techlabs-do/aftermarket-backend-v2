import Container from 'typedi';
import { Action } from 'routing-controllers';
import { parseJwt } from '@infrastructure/common/jwt';
import { UserService } from '@data/services/users.service';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@config/environments';

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    return decodedToken.exp < currentTimestamp;
  } catch (error) {
    return true;
  }
};

export const getAuthorization = req => {
  const header = req;
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (action: Action): Promise<boolean> => {
  try {
    const req = action.request;
    const Authorization = getAuthorization(req.headers.authorization);
    if (Authorization) {
      const isExpired = isTokenExpired(Authorization);
      if (!isExpired) {
        const { sub } = parseJwt(Authorization);
        const user = await Container.get(UserService).findUser(Number(sub));
        if (user) {
          action.request.user = user;
        }
        if (!action.request.user) return false;

        return true;
      }
      return false;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
