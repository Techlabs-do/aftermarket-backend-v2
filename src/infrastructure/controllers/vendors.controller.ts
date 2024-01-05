import { Container } from 'typedi';
import { JsonController, Get, HttpCode, Authorized, Post, UseBefore, Body, Param, Delete, Put } from 'routing-controllers';
import { USER_TYPES } from '@prisma/client';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { CustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { VendorGetUsecase } from '@domain/usecases/vendor/get';
import { VendorListUsecase } from '@domain/usecases/vendor/all';
import { VendorCreateUsecase } from '@domain/usecases/vendor/create';
import { VendorDeleteUsecase } from '@domain/usecases/vendor/delete';
import { VendorPhoneDto, VendorPhonesDto } from '@data/dtos/users/vendor-phones.dto';
import { VendorUpdatePhoneUsecase } from '@domain/usecases/vendor/updatePhone';
import { VendorDeletePhoneUsecase } from '@domain/usecases/vendor/deletePhone';
import { VendorGetPhoneUsecase } from '@domain/usecases/vendor/getPhone';
import { VendorCreatePhonesUsecase } from '@domain/usecases/vendor/createPhones';

@JsonController('/vendor')
export class VendorController {
  public vendorCreateUsecase = Container.get(VendorCreateUsecase);
  public vendorGetUsecase = Container.get(VendorGetUsecase);
  public vendorListUsecase = Container.get(VendorListUsecase);
  public vendorDeleteUsecase = Container.get(VendorDeleteUsecase);
  public vendorUpdatePhoneUsecase = Container.get(VendorUpdatePhoneUsecase);
  public vendorDeletePhoneUsecase = Container.get(VendorDeletePhoneUsecase);
  public vendorGetPhoneUsecase = Container.get(VendorGetPhoneUsecase);
  public vendorCreatePhonesUsecase = Container.get(VendorCreatePhonesUsecase);

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
}
