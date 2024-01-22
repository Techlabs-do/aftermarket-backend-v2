import { Container } from 'typedi';
import { JsonController, Get, HttpCode, Authorized, Post, UseBefore, Body, Param, Delete, Put } from 'routing-controllers';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { UserProductDto } from '@data/dtos/products/product.dto';
import { UserProductCreateUsecase } from '@domain/usecases/userProduct/create';
import { UserProductGetUsecase } from '@domain/usecases/userProduct/getById';
import { UserProductListByUserIdUsecase } from '@domain/usecases/userProduct/getUserProductByUserId';
import { UserProductListUsecase } from '@domain/usecases/userProduct/getAll';
import { UserProductDeleteUsecase } from '@domain/usecases/userProduct/delete';
import { UserProductUpdateUsecase } from '@domain/usecases/userProduct/update';

@JsonController('/user-product')
export class UserProductController {
  public userProductCreateUsecase = Container.get(UserProductCreateUsecase);
  public userProductGetUsecase = Container.get(UserProductGetUsecase);
  public userProductListByUserIdUsecase = Container.get(UserProductListByUserIdUsecase);
  public userProductListUsecase = Container.get(UserProductListUsecase);
  public userProductDeleteUsecase = Container.get(UserProductDeleteUsecase);
  public userProductUpdateUsecase = Container.get(UserProductUpdateUsecase);

  @Post('/user/:userId/product/:productId')
  @UseBefore(ValidationMiddleware(UserProductDto))
  @Authorized()
  @HttpCode(201)
  async createUserProduct(@Param('userId') userId: number, @Param('productId') productId: number, @Body() data: UserProductDto) {
    return await this.userProductCreateUsecase.call(userId, productId, data);
  }

  @Get('/:id/user/:userId/product/:productId')
  @Authorized()
  @HttpCode(200)
  async getUserProduct(@Param('id') id: number, @Param('userId') userId: number, @Param('productId') productId: number) {
    return await this.userProductGetUsecase.call(id, userId, productId);
  }

  @Get('/user/:userId')
  @Authorized()
  @HttpCode(200)
  async getAllUserProductsByUserId(@Param('userId') userId: number) {
    return await this.userProductListByUserIdUsecase.call(userId);
  }

  @Get('/')
  @Authorized()
  @HttpCode(200)
  async getAllUserProducts() {
    return await this.userProductListUsecase.call();
  }

  @Delete('/:id')
  @Authorized()
  @HttpCode(200)
  async deleteProduct(@Param('id') id: number) {
    return await this.userProductDeleteUsecase.call(id);
  }

  @Put('/:id')
  @UseBefore(ValidationMiddleware(UserProductDto))
  @Authorized()
  @HttpCode(200)
  async updateUserProduct(@Param('id') id: number, @Body() data: UserProductDto) {
    return await this.userProductUpdateUsecase.call(id, data);
  }
}
