import { Service } from 'typedi';
import { SignupDto } from '@data/dtos/auth/signup.dto';
import { HttpException } from '@data/exceptions/http_exception';
import database from '@config/database';
import bcrypt from 'bcrypt';

@Service()
export class AuthService {
  public user = database.instance.loginUsers;

  public async userDetail(username: string) {
    try {
      const user = await this.user.findFirst({
        where: {
          email: username,
        },
      });
      return user;
    } catch (error) {}
  }

  public async signUpByEmail(userData: SignupDto) {
    try {
      const passwordHash = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        data: {
          email: userData.email,
          password: passwordHash,
        },
      });
      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      const err = error as any;
      throw new HttpException(err.statusCode || 500, err.message);
    }
  }
}
