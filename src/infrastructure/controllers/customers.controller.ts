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

@JsonController('/customer')
export class CustomerController {
  private userType;
  constructor() {
    this.userType = USER_TYPES.CUSTOMERS;
  }
  public customerCreateUsecase = Container.get(CustomerCreateUsecase);
  public customerGetUsecase = Container.get(CustomerGetUsecase);
  public customerListUsecase = Container.get(CustomerListUsecase);
  public customerDeleteUsecase = Container.get(CustomerDeleteUsecase);
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
    return await this.customerCreateUsecase.call({ ...userData, type: this.userType });
  }

  @Get('/:id')
  @Authorized()
  @HttpCode(200)
  async getCustomer(@Param('id') id: string) {
    return await this.customerGetUsecase.call(id);
  }

  @Get('/')
  @Authorized()
  @HttpCode(200)
  async getAll() {
    return await this.customerListUsecase.call();
  }

  @Delete('/:id')
  @Authorized()
  @HttpCode(200)
  async deleteAssessment(@Param('id') id: string) {
    return await this.customerDeleteUsecase.call(id);
  }

  @Post('/phones')
  @UseBefore(ValidationMiddleware(CustomerPhonesDto))
  @Authorized()
  @HttpCode(201)
  async createPhones(@Body() data: CustomerPhonesDto[]) {
    return await this.customerCreatePhonesUsecase.call(data);
  }

  @Get('/phone/:id')
  @Authorized()
  @HttpCode(201)
  async getPhoneById(@Param('id') id: string) {
    return await this.customerGetPhoneUsecase.call(id);
  }

  @Delete('/phone/:id')
  @Authorized()
  @HttpCode(201)
  async deletePhoneById(@Param('id') id: string) {
    return await this.customerDeletePhoneUsecase.call(id);
  }

  @Put('/phone/:id')
  @Authorized()
  @HttpCode(201)
  async updatePhoneById(@Param('id') id: string, @Body() data: CustomerPhoneDto) {
    return await this.customerUpdatePhoneUsecase.call(id, data);
  }

  @Post('/address')
  @UseBefore(ValidationMiddleware(CustomerAddresssDto))
  @Authorized()
  @HttpCode(201)
  async createAddress(@Body() data: CustomerAddresssDto[]) {
    return await this.customerCreateAddresssUsecase.call(data);
  }

  @Get('/address/:id')
  @Authorized()
  @HttpCode(201)
  async getAddressById(@Param('id') id: string) {
    return await this.customerGetAddressUsecase.call(id);
  }

  @Delete('/address/:id')
  @Authorized()
  @HttpCode(201)
  async deleteAddressById(@Param('id') id: string) {
    return await this.customerDeleteAddressUsecase.call(id);
  }

  @Put('/address/:id')
  @Authorized()
  @HttpCode(201)
  async updateAddressById(@Param('id') id: string, @Body() data: CustomerAddressDto) {
    return await this.customerUpdateAddressUsecase.call(id, data);
  }
}
