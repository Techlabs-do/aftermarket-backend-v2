import { Service } from 'typedi';
import database from '@config/database';
import { ExtendedCustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { USER_TYPES } from '@prisma/client';
import { CustomerPhoneDto, CustomerPhonesDto } from '@data/dtos/users/customer-phones.dto';

@Service()
export class CustomerVendorService {
  public users = database.instance.users;
  public phones = database.instance.phones;

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
      include: {
        addresses: true,
        phones: true,
      },
    });
    return user;
  }

  public async getAllCustomers() {
    const user = await this.users.findMany({
      where: {
        type: USER_TYPES.CUSTOMERS,
      },
      include: {
        addresses: true,
        phones: true,
      },
    });
    return user;
  }

  public async getAllVendors() {
    const user = await this.users.findMany({
      where: {
        type: USER_TYPES.VENDORS,
      },
      include: {
        addresses: true,
        phones: true,
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
  //Phones//
  public async createPhones(data: CustomerPhonesDto[]) {
    const createdPhones = await this.phones.createMany({
      data: data.map(item => item),
      skipDuplicates: true,
    });
    return createdPhones;
  }

  public async getPhoneById(id: number) {
    const phones = await this.phones.findFirst({
      where: {
        id,
      },
    });
    return phones;
  }

  public async deletePhoneById(id: number) {
    const phones = await this.phones.delete({
      where: {
        id,
      },
    });
    return phones;
  }
  public async updatePhone(id: number, data: CustomerPhoneDto) {
    const updatedphone = await this.phones.update({
      where: {
        id,
      },
      data: {
        contact_person: data.contact_person,
        number: data.number,
      },
    });
    return updatedphone;
  }
}
