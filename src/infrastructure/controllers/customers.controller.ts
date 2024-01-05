import { Container } from 'typedi';
import { JsonController, HttpCode, Authorized, Post, UseBefore, Body, Get, Param, Delete, Put } from 'routing-controllers';
import { USER_TYPES } from '@prisma/client';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { CustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { CustomerCreateUsecase } from '@domain/usecases/customer/user/create';
import { CustomerGetUsecase } from '@domain/usecases/customer/user/get';
import { CustomerListUsecase } from '@domain/usecases/customer/user/all';
import { CustomerDeleteUsecase } from '@domain/usecases/customer/user/delete';
import { CustomerPhoneDto, CustomerPhonesDto } from '@data/dtos/users/customer-vendor-phones.dto';
import { CustomerCreatePhonesUsecase } from '@domain/usecases/customer/phone/createPhones';
import { CustomerGetPhoneUsecase } from '@domain/usecases/customer/phone/getPhone';
import { CustomerDeletePhoneUsecase } from '@domain/usecases/customer/phone/deletePhone';
import { CustomerUpdatePhoneUsecase } from '@domain/usecases/customer/phone/updatePhone';
import { CustomerAddressDto, CustomerAddresssDto } from '@data/dtos/users/customer-vendor-addresses.dto';
import { CustomerCreateAddresssUsecase } from '@domain/usecases/customer/address/createAddress';
import { CustomerGetAddressUsecase } from '@domain/usecases/customer/address/getAddress';
import { CustomerDeleteAddressUsecase } from '@domain/usecases/customer/address/deleteAddress';
import { CustomerUpdateAddressUsecase } from '@domain/usecases/customer/address/updateAddress';
import { CustomerUpdateUsecase } from '@domain/usecases/customer/user/update';

@JsonController('/customer')
export class CustomerController {
  public customerCreateUsecase = Container.get(CustomerCreateUsecase);
  public customerGetUsecase = Container.get(CustomerGetUsecase);
  public customerListUsecase = Container.get(CustomerListUsecase);
  public customerDeleteUsecase = Container.get(CustomerDeleteUsecase);
  public customerUpdateUsecase = Container.get(CustomerUpdateUsecase);
  //Phones
  public customerCreatePhonesUsecase = Container.get(CustomerCreatePhonesUsecase);
  public customerGetPhoneUsecase = Container.get(CustomerGetPhoneUsecase);
  public customerDeletePhoneUsecase = Container.get(CustomerDeletePhoneUsecase);
  public customerUpdatePhoneUsecase = Container.get(CustomerUpdatePhoneUsecase);
  //Address
  public customerCreateAddresssUsecase = Container.get(CustomerCreateAddresssUsecase);
  public customerGetAddressUsecase = Container.get(CustomerGetAddressUsecase);
  public customerDeleteAddressUsecase = Container.get(CustomerDeleteAddressUsecase);
  public customerUpdateAddressUsecase = Container.get(CustomerUpdateAddressUsecase);

  @Post('/')
  @UseBefore(ValidationMiddleware(CustomerVendorDto))
  @Authorized()
  @HttpCode(201)
  async createCustomer(@Body() userData: CustomerVendorDto) {
    return await this.customerCreateUsecase.call({ ...userData, type: USER_TYPES.CUSTOMERS });
  }

  @Get('/:id')
  @Authorized()
  @HttpCode(200)
  async getCustomer(@Param('id') id: number) {
    return await this.customerGetUsecase.call(id);
  }

  @Get('/')
  @Authorized()
  @HttpCode(200)
  async getAll() {
    return await this.customerListUsecase.call();
  }

  @Put('/:id')
  @Authorized()
  @HttpCode(200)
  async updateCustomerById(@Param('id') id: number, @Body() data: CustomerVendorDto) {
    return await this.customerUpdateUsecase.call(id, { ...data, type: USER_TYPES.CUSTOMERS });
  }

  @Delete('/:id')
  @Authorized()
  @HttpCode(200)
  async deleteCustomer(@Param('id') id: number) {
    return await this.customerDeleteUsecase.call(id);
  }

  @Post('/:userId/phones')
  @UseBefore(ValidationMiddleware(CustomerPhonesDto))
  @Authorized()
  @HttpCode(201)
  async createPhones(@Param('userId') userId: number, @Body() data: CustomerPhonesDto[]) {
    return await this.customerCreatePhonesUsecase.call(data, userId);
  }

  @Get('/:userId/phone/:id')
  @Authorized()
  @HttpCode(200)
  async getPhoneById(@Param('userId') userId: number, @Param('id') id: number) {
    return await this.customerGetPhoneUsecase.call(id, userId);
  }

  @Delete('/:userId/phone/:id')
  @Authorized()
  @HttpCode(200)
  async deletePhoneById(@Param('userId') userId: number, @Param('id') id: number) {
    return await this.customerDeletePhoneUsecase.call(id, userId);
  }

  @Put('/:userId/phone/:id')
  @UseBefore(ValidationMiddleware(CustomerPhoneDto))
  @Authorized()
  @HttpCode(200)
  async updatePhoneById(@Param('userId') userId: number, @Param('id') id: number, @Body() data: CustomerPhoneDto) {
    return await this.customerUpdatePhoneUsecase.call(id, data, userId);
  }

  @Post('/:userId/address')
  @UseBefore(ValidationMiddleware(CustomerAddresssDto))
  @Authorized()
  @HttpCode(201)
  async createAddress(@Param('userId') userId: number, @Body() data: CustomerAddresssDto[]) {
    return await this.customerCreateAddresssUsecase.call(data, userId);
  }

  @Get('/:userId/address/:id')
  @Authorized()
  @HttpCode(200)
  async getAddressById(@Param('userId') userId: number, @Param('id') id: number) {
    return await this.customerGetAddressUsecase.call(id, userId);
  }

  @Delete('/:userId/address/:id')
  @Authorized()
  @HttpCode(200)
  async deleteAddressById(@Param('userId') userId: number, @Param('id') id: number) {
    return await this.customerDeleteAddressUsecase.call(id, userId);
  }

  @Put('/:userId/address/:id')
  @Authorized()
  @HttpCode(200)
  async updateAddressById(@Param('userId') userId: number, @Param('id') id: number, @Body() data: CustomerAddressDto) {
    return await this.customerUpdateAddressUsecase.call(id, data, userId);
  }
}
