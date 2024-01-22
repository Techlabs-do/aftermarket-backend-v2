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
import { VendorUpdateUsecase } from '@domain/usecases/vendor/user/update';

@JsonController('/vendor')
export class VendorController {
  public vendorCreateUsecase = Container.get(VendorCreateUsecase);
  public vendorGetUsecase = Container.get(VendorGetUsecase);
  public vendorListUsecase = Container.get(VendorListUsecase);
  public vendorDeleteUsecase = Container.get(VendorDeleteUsecase);
  public vendorUpdateUsecase = Container.get(VendorUpdateUsecase);

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

  @Put('/:id')
  @Authorized()
  @HttpCode(200)
  async updateVendorById(@Param('id') id: number, @Body() data: CustomerVendorDto) {
    return await this.vendorUpdateUsecase.call(id, { ...data, type: USER_TYPES.VENDORS });
  }

  @Delete('/:id')
  @Authorized()
  @HttpCode(200)
  async deleteVendor(@Param('id') id: number) {
    return await this.vendorDeleteUsecase.call(id);
  }

  @Post('/:userId/phones')
  @UseBefore(ValidationMiddleware(VendorPhonesDto))
  @Authorized()
  @HttpCode(201)
  async createPhones(@Param('userId') userId: number, @Body() data: VendorPhonesDto[]) {
    return await this.vendorCreatePhonesUsecase.call(data, userId);
  }

  @Get('/:userId/phone/:id')
  @Authorized()
  @HttpCode(200)
  async getPhoneById(@Param('userId') userId: number, @Param('id') id: number) {
    return await this.vendorGetPhoneUsecase.call(id, userId);
  }

  @Delete('/:userId/phone/:id')
  @Authorized()
  @HttpCode(200)
  async deletePhoneById(@Param('userId') userId: number, @Param('id') id: number) {
    return await this.vendorDeletePhoneUsecase.call(id, userId);
  }

  @Put('/:userId/phone/:id')
  @Authorized()
  @HttpCode(200)
  async updatePhoneById(@Param('userId') userId: number, @Param('id') id: number, @Body() data: VendorPhoneDto) {
    return await this.vendorUpdatePhoneUsecase.call(id, data, userId);
  }

  @Post('/:userId/address')
  @UseBefore(ValidationMiddleware(VendorAddresssDto))
  @Authorized()
  @HttpCode(201)
  async createAddress(@Param('userId') userId: number, @Body() data: VendorAddresssDto[]) {
    return await this.vendorCreateAddresssUsecase.call(data, userId);
  }

  @Get('/:userId/address/:id')
  @Authorized()
  @HttpCode(200)
  async getAddressById(@Param('userId') userId: number, @Param('id') id: number) {
    return await this.vendorGetAddressUsecase.call(id, userId);
  }

  @Delete('/:userId/address/:id')
  @Authorized()
  @HttpCode(200)
  async deleteAddressById(@Param('userId') userId: number, @Param('id') id: number) {
    return await this.vendorDeleteAddressUsecase.call(id, userId);
  }

  @Put('/:userId/address/:id')
  @Authorized()
  @HttpCode(200)
  async updateAddressById(@Param('userId') userId: number, @Param('id') id: number, @Body() data: VendorAddressDto) {
    return await this.vendorUpdateAddressUsecase.call(id, data, userId);
  }
}
