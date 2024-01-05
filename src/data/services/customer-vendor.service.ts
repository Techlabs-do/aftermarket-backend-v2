import { Service } from 'typedi';
import database from '@config/database';
import { ExtendedCustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { USER_TYPES } from '@prisma/client';
import { CustomerPhoneDto, CustomerPhonesDto } from '@data/dtos/users/customer-vendor-phones.dto';
import { CustomerAddressDto, CustomerAddresssDto } from '@data/dtos/users/customer-vendor-addresses.dto';

@Service()
export class CustomerVendorService {
  public users = database.instance.users;
  public phones = database.instance.phones;
  public addresses = database.instance.addresses;

  public async create(data: ExtendedCustomerVendorDto) {
    const user = await this.users.create({
      data,
    });
    return user;
  }

  public async update(id: number, data: ExtendedCustomerVendorDto) {
    const user = await this.users.update({
      where: {
        id,
      },
      data: {
        company_name: data.company_name,
        email: data.email,
        type: data.type,
        website: data.website,
      },
    });
    return {
      user,
    };
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
  public async createPhones(data: CustomerPhonesDto[], user_id: number) {
    const createdPhones = await this.phones.createMany({
      data: data.map(item => ({
        user_id,
        ...item,
      })),
      skipDuplicates: true,
    });
    return createdPhones;
  }

  public async getPhoneById(id: number, user_id: number) {
    const phones = await this.phones.findFirst({
      where: {
        id,
        user_id,
      },
    });
    return phones;
  }

  public async deletePhoneById(id: number, user_id: number) {
    const phones = await this.phones.delete({
      where: {
        id,
        user_id,
      },
    });
    return phones;
  }
  public async updatePhone(id: number, data: CustomerPhoneDto, user_id: number) {
    const updatedphone = await this.phones.update({
      where: {
        id,
        user_id,
      },
      data: {
        contact_person: data.contact_person,
        number: data.number,
      },
    });
    return updatedphone;
  }
  //Addresses
  public async createAddress(data: CustomerAddresssDto[], user_id: number) {
    const createdAddress = await this.addresses.createMany({
      data: data.map(item => ({
        user_id,
        ...item,
      })),
      skipDuplicates: true,
    });
    return createdAddress;
  }

  public async getAddressById(id: number, user_id: number) {
    const address = await this.addresses.findFirst({
      where: {
        id,
        user_id,
      },
    });
    return address;
  }

  public async deleteAddressById(id: number, user_id: number) {
    const address = await this.addresses.delete({
      where: {
        id,
        user_id,
      },
    });
    return address;
  }
  public async updateAddress(id: number, data: CustomerAddressDto, user_id: number) {
    const updatedAddress = await this.addresses.update({
      where: {
        id,
        user_id,
      },
      data: {
        address: data.address,
        country: data.country,
      },
    });
    return updatedAddress;
  }
}
