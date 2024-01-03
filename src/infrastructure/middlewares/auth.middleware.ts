import Container from 'typedi';
import { Action } from 'routing-controllers';
import { parseJwt } from '@infrastructure/common/jwt';
import { UserService } from '@data/services/users.service';

export const getAuthorization = req => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (action: Action, roles: string[]): Promise<boolean> => {
  try {
    const req = action.request;
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { id } = parseJwt(Authorization);
      const user = await Container.get(UserService).findUserByIdWithRole(id);
      if (user) {
        action.request.user = user;
      }

      if (!action.request.user) return false;

      if (action.request.user && !roles.length) return true;

      if (roles.length > 0) {
        return roles.includes(action.request.user.role);
      }

      return false;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
