import { Container } from 'typedi';
import { JsonController, HttpCode, Authorized, Post, UseBefore, Body, Get, Param } from 'routing-controllers';
import { USER_TYPES } from '@prisma/client';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { CustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { CustomerCreateUsecase } from '@domain/usecases/customer/create';
import { CustomerGetUsecase } from '@domain/usecases/customer/get';
import { CustomerListUsecase } from '@domain/usecases/customer/all';

@JsonController('/customer')
export class CustomerController {
  private userType;
  constructor() {
    this.userType = USER_TYPES.CUSTOMERS;
  }
  public customerCreateUsecase = Container.get(CustomerCreateUsecase);
  public customerGetUsecase = Container.get(CustomerGetUsecase);
  public customerListUsecase = Container.get(CustomerListUsecase);

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
}
