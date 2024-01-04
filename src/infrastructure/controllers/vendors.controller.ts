import { Container } from 'typedi';
import { JsonController, Get, HttpCode, Authorized, Post, UseBefore, Body, Param } from 'routing-controllers';
import { USER_TYPES } from '@prisma/client';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { CustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { VendorGetUsecase } from '@domain/usecases/vendor/get';
import { VendorListUsecase } from '@domain/usecases/vendor/all';
import { VendorCreateUsecase } from '@domain/usecases/vendor/create';

@JsonController('/vendor')
export class VendorController {
  private userType;
  constructor() {
    this.userType = USER_TYPES.VENDORS;
  }
  public vendorCreateUsecase = Container.get(VendorCreateUsecase);
  public vendorGetUsecase = Container.get(VendorGetUsecase);
  public vendorListUsecase = Container.get(VendorListUsecase);

  @Post('/')
  @UseBefore(ValidationMiddleware(CustomerVendorDto))
  @Authorized()
  @HttpCode(201)
  async createVendor(@Body() userData: CustomerVendorDto) {
    return await this.vendorCreateUsecase.call({ ...userData, type: this.userType });
  }

  @Get('/:id')
  @Authorized()
  @HttpCode(200)
  async getVendor(@Param('id') id: string) {
    return await this.vendorGetUsecase.call(id);
  }

  @Get('/')
  @Authorized()
  @HttpCode(200)
  async getAll() {
    return await this.vendorListUsecase.call();
  }
}
