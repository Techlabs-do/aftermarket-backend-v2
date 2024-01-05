import { Container } from 'typedi';
import { JsonController, HttpCode, Authorized, Post, UseBefore, Body, Get, Param, Delete, Put } from 'routing-controllers';
import { USER_TYPES } from '@prisma/client';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { CustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { CustomerCreateUsecase } from '@domain/usecases/customer/create';
import { CustomerGetUsecase } from '@domain/usecases/customer/get';
import { CustomerListUsecase } from '@domain/usecases/customer/all';
import { CustomerDeleteUsecase } from '@domain/usecases/customer/delete';
import { CustomerPhoneDto, CustomerPhonesDto } from '@data/dtos/users/customer-phones.dto';
import { CustomerCreatePhonesUsecase } from '@domain/usecases/customer/createPhones';
import { CustomerGetPhoneUsecase } from '@domain/usecases/customer/getPhone';
import { CustomerDeletePhoneUsecase } from '@domain/usecases/customer/deletePhone';
import { CustomerUpdatePhoneUsecase } from '@domain/usecases/customer/updatePhone';

@JsonController('/customer')
export class CustomerController {
  public customerCreateUsecase = Container.get(CustomerCreateUsecase);
  public customerGetUsecase = Container.get(CustomerGetUsecase);
  public customerListUsecase = Container.get(CustomerListUsecase);
  public customerDeleteUsecase = Container.get(CustomerDeleteUsecase);
  public customerCreatePhonesUsecase = Container.get(CustomerCreatePhonesUsecase);
  public customerGetPhoneUsecase = Container.get(CustomerGetPhoneUsecase);
  public customerDeletePhoneUsecase = Container.get(CustomerDeletePhoneUsecase);
  public customerUpdatePhoneUsecase = Container.get(CustomerUpdatePhoneUsecase);

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

  @Delete('/:id')
  @Authorized()
  @HttpCode(200)
  async deleteAssessment(@Param('id') id: number) {
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
  @HttpCode(200)
  async getPhoneById(@Param('id') id: number) {
    return await this.customerGetPhoneUsecase.call(id);
  }

  @Delete('/phone/:id')
  @Authorized()
  @HttpCode(200)
  async deletePhoneById(@Param('id') id: number) {
    return await this.customerDeletePhoneUsecase.call(id);
  }

  @Put('/phone/:id')
  @Authorized()
  @HttpCode(201)
  async updatePhoneById(@Param('id') id: number, @Body() data: CustomerPhoneDto) {
    return await this.customerUpdatePhoneUsecase.call(id, data);
  }
}
