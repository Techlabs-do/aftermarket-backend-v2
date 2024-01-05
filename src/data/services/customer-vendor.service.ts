import { Service } from 'typedi';
import database from '@config/database';
import { ExtendedCustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { USER_TYPES } from '@prisma/client';

@Service()
export class CustomerVendorService {
  public users = database.instance.users;

  public async create(data: ExtendedCustomerVendorDto) {
    const user = await this.users.create({
      data,
    });
    return user;
  }

  public async get(id: number) {
    const user = await this.users.findFirst({
      where: {
        id: id,
      },
    });
    return user;
  }

  public async getAllCustomers() {
    const user = await this.users.findMany({
      where: {
        type: USER_TYPES.CUSTOMERS,
      },
    });
    return user;
  }

  public async getAllVendors() {
    const user = await this.users.findMany({
      where: {
        type: USER_TYPES.VENDORS,
      },
    });
    return user;
  }

  public async delete(id: number) {
    const user = await this.users.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
