import { Container } from 'typedi';
import { JsonController, Get, HttpCode, Authorized, Post, UseBefore, Body, Param, Delete, Put } from 'routing-controllers';
import { USER_TYPES } from '@prisma/client';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { CustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { VendorGetUsecase } from '@domain/usecases/vendor/user/get';
import { VendorListUsecase } from '@domain/usecases/vendor/user/all';
import { VendorCreateUsecase } from '@domain/usecases/vendor/user/create';
import { VendorDeleteUsecase } from '@domain/usecases/vendor/user/delete';
import { VendorUpdatePhoneUsecase } from '@domain/usecases/vendor/phone/updatePhone';
import { VendorDeletePhoneUsecase } from '@domain/usecases/vendor/phone/deletePhone';
import { VendorGetPhoneUsecase } from '@domain/usecases/vendor/phone/getPhone';
import { VendorCreatePhonesUsecase } from '@domain/usecases/vendor/phone/createPhones';
import { VendorCreateAddresssUsecase } from '@domain/usecases/vendor/address/createAddress';
import { VendorGetAddressUsecase } from '@domain/usecases/vendor/address/getAddress';
import { VendorDeleteAddressUsecase } from '@domain/usecases/vendor/address/deleteAddress';
import { VendorUpdateAddressUsecase } from '@domain/usecases/vendor/address/updateAddress';
import { VendorAddressDto, VendorAddresssDto } from '@data/dtos/users/customer-vendor-addresses.dto';
import { VendorPhoneDto, VendorPhonesDto } from '@data/dtos/users/customer-vendor-phones.dto';

@JsonController('/vendor')
export class VendorController {
  public vendorCreateUsecase = Container.get(VendorCreateUsecase);
  public vendorGetUsecase = Container.get(VendorGetUsecase);
  public vendorListUsecase = Container.get(VendorListUsecase);
  public vendorDeleteUsecase = Container.get(VendorDeleteUsecase);

  //Phones
  public vendorUpdatePhoneUsecase = Container.get(VendorUpdatePhoneUsecase);
  public vendorDeletePhoneUsecase = Container.get(VendorDeletePhoneUsecase);
  public vendorGetPhoneUsecase = Container.get(VendorGetPhoneUsecase);
  public vendorCreatePhonesUsecase = Container.get(VendorCreatePhonesUsecase);

  //Address
  public vendorCreateAddresssUsecase = Container.get(VendorCreateAddresssUsecase);
  public vendorUpdateAddressUsecase = Container.get(VendorUpdateAddressUsecase);
  public vendorGetAddressUsecase = Container.get(VendorGetAddressUsecase);
  public vendorDeleteAddressUsecase = Container.get(VendorDeleteAddressUsecase);

  @Post('/')
  @UseBefore(ValidationMiddleware(CustomerVendorDto))
  @Authorized()
  @HttpCode(201)
  async createVendor(@Body() userData: CustomerVendorDto) {
    return await this.vendorCreateUsecase.call({ ...userData, type: USER_TYPES.VENDORS });
  }

  @Get('/:id')
  @Authorized()
  @HttpCode(200)
  async getVendor(@Param('id') id: number) {
    return await this.vendorGetUsecase.call(id);
  }

  @Get('/')
  @Authorized()
  @HttpCode(200)
  async getAll() {
    return await this.vendorListUsecase.call();
  }

  @Delete('/:id')
  @Authorized()
  @HttpCode(200)
  async deleteAssessment(@Param('id') id: number) {
    return await this.vendorDeleteUsecase.call(id);
  }

  @Post('/phones')
  @UseBefore(ValidationMiddleware(VendorPhonesDto))
  @Authorized()
  @HttpCode(201)
  async createPhones(@Body() data: VendorPhonesDto[]) {
    return await this.vendorCreatePhonesUsecase.call(data);
  }

  @Get('/phone/:id')
  @Authorized()
  @HttpCode(200)
  async getPhoneById(@Param('id') id: number) {
    return await this.vendorGetPhoneUsecase.call(id);
  }

  @Delete('/phone/:id')
  @Authorized()
  @HttpCode(200)
  async deletePhoneById(@Param('id') id: number) {
    return await this.vendorDeletePhoneUsecase.call(id);
  }

  @Put('/phone/:id')
  @Authorized()
  @HttpCode(201)
  async updatePhoneById(@Param('id') id: number, @Body() data: VendorPhoneDto) {
    return await this.vendorUpdatePhoneUsecase.call(id, data);
  }

  @Post('/address')
  @UseBefore(ValidationMiddleware(VendorAddresssDto))
  @Authorized()
  @HttpCode(201)
  async createAddress(@Body() data: VendorAddresssDto[]) {
    return await this.vendorCreateAddresssUsecase.call(data);
  }

  @Get('/address/:id')
  @Authorized()
  @HttpCode(201)
  async getAddressById(@Param('id') id: number) {
    return await this.vendorGetAddressUsecase.call(id);
  }

  @Delete('/address/:id')
  @Authorized()
  @HttpCode(201)
  async deleteAddressById(@Param('id') id: number) {
    return await this.vendorDeleteAddressUsecase.call(id);
  }

  @Put('/address/:id')
  @Authorized()
  @HttpCode(201)
  async updateAddressById(@Param('id') id: number, @Body() data: VendorAddressDto) {
    return await this.vendorUpdateAddressUsecase.call(id, data);
  }
}
