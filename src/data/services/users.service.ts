import { Service } from 'typedi';
import database from '@config/database';

@Service()
export class UserService {
  public users = database.instance.loginUsers;

  public async findAllUser() {
    const allUser = await this.users.findMany();
    return allUser;
  }

  public async findUser(id: number) {
    const user = await this.users.findFirst({
      where: {
        id,
      },
    });
    return {
      id: user.id,
      email: user.email,
    };
  }
}
