import { Service } from 'typedi';
import database from '@config/database';
import { HttpException } from '@data/exceptions/http_exception';
import { CreateUserDto } from '@data/dtos/users/create_user.dto';
import { UpdateProfileDto } from '@data/dtos/users/update_profile.dto';

@Service()
export class UserService {
  public users = database.instance.users;

  public async findAllUser() {
    const allUser = await this.users.findMany();
    return allUser;
  }

  public async findUserById(id: string) {
    const user = await this.users.findUnique({ where: { id: id } });
    if (!user) {
      throw new HttpException(409, "User doesn't exist");
    }

    return user;
  }

  public async findUserByAuthID(id: string) {
    const user = await this.users.findUnique({ where: { auth_id: id } });
    if (!user) {
      throw new HttpException(409, "User doesn't exist");
    }

    return user;
  }

  public async findUserByEmail(email: string) {
    const user = await this.users.findUnique({ where: { email: email } });
    return user;
  }

  public async findUserByIdWithRole(id: string) {
    const user = await this.users.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        phone: true,
        auth_id: true,
        profile: true,
        last_name: true,
        first_name: true,
        stripe_customer_id: true,
        onboarding_complete: true,
        FirmHasMembers: {
          select: {
            role: true,
            firm_id: true,
          },
        },
      },
    });
    if (!user) {
      throw new HttpException(409, "User doesn't exist");
    }

    const { FirmHasMembers, ...rest } = user;
    return {
      ...rest,
      role: FirmHasMembers.length ? FirmHasMembers[0].role : '',
      firm_id: FirmHasMembers.length ? FirmHasMembers[0].firm_id : '',
    };
  }

  public async createuser(userData: CreateUserDto) {
    const user = await this.users.findUnique({ where: { email: userData.email } });

    if (user) {
      throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    return await this.users.create({ data: userData });
  }

  //update-profile
  public async updateUser(id: string, userData: UpdateProfileDto) {
    const user = await this.users.update({
      where: { id: id },
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phoneNumber,
        profile: userData.profile,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        auth_id: true,
        profile: true,
        last_name: true,
        first_name: true,
        onboarding_complete: true,
        FirmHasMembers: {
          select: {
            role: true,
          },
        },
      },
    });

    const { FirmHasMembers, ...rest } = user;
    return {
      ...rest,
      role: FirmHasMembers.length ? FirmHasMembers[0].role : '',
    };
  }

  //update-profile-PICTURE
  public async updateUserPicture(id: string, url: string) {
    return await this.users.update({
      where: { id: id },
      data: { profile: url },
    });
  }

  public async updateUserOnboarding(id: string) {
    const updatedOnboarding = await this.users.update({ where: { id: id }, data: { onboarding_complete: true } });
    return updatedOnboarding;
  }
}
