import { Container } from 'typedi';
import { JsonController, HttpCode, Authorized, Post, UseBefore, Body, Param, Put, Get } from 'routing-controllers';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { RecieptDto, RecieptItemDto } from '@data/dtos/reciepts/reciept.dto';
import { UserRecieptCreateUsecase } from '@domain/usecases/reciepts/createUserReciept';
import { UserRecieptUpdateUsecase } from '@domain/usecases/reciepts/updateUserReciept';
import { RecieptItemCreateUsecase } from '@domain/usecases/reciepts/Item/create';
import { RecieptItemUpdateUsecase } from '@domain/usecases/reciepts/Item/update';
import { UserRecieptGetUsecase } from '@domain/usecases/reciepts/getUserReciept';
import { RecieptItemGetUsecase } from '@domain/usecases/reciepts/Item/get';

@JsonController('/reciepts')
export class RecieptsController {
  public userRecieptCreateUsecase = Container.get(UserRecieptCreateUsecase);
  public userRecieptUpdateUsecase = Container.get(UserRecieptUpdateUsecase);
  public userRecieptGetUsecase = Container.get(UserRecieptGetUsecase);
  //RecieptItem
  public recieptItemCreateUsecase = Container.get(RecieptItemCreateUsecase);
  public recieptItemUpdateUsecase = Container.get(RecieptItemUpdateUsecase);
  public recieptItemGetUsecase = Container.get(RecieptItemGetUsecase);

  @Post('/user/:userId')
  @UseBefore(ValidationMiddleware(RecieptDto))
  @Authorized()
  @HttpCode(201)
  async createUserReciept(@Param('userId') userId: number, @Body() data: RecieptDto) {
    return await this.userRecieptCreateUsecase.call(userId, data);
  }

  @Put('/:id')
  @UseBefore(ValidationMiddleware(RecieptDto))
  @Authorized()
  @HttpCode(200)
  async updateUserReciept(@Param('id') id: number, @Body() data: RecieptDto) {
    return await this.userRecieptUpdateUsecase.call(id, data);
  }

  @Get('/:id')
  @Authorized()
  @HttpCode(200)
  async getReciept(@Param('id') id: number) {
    return await this.userRecieptGetUsecase.call(id);
  }

  @Post('/:id/userproduct/:userProductId/item/')
  @UseBefore(ValidationMiddleware(RecieptItemDto))
  @Authorized()
  @HttpCode(201)
  async createRecieptItem(@Param('id') id: number, @Param('userProductId') userProductId: number, @Body() data: RecieptItemDto) {
    return await this.recieptItemCreateUsecase.call(id, userProductId, data);
  }

  @Put('/:id/userproduct/:userProductId/item/:itemId')
  @UseBefore(ValidationMiddleware(RecieptItemDto))
  @Authorized()
  @HttpCode(200)
  async updateRecieptItem(
    @Param('id') id: number,
    @Param('userProductId') userProductId: number,
    @Param('itemId') itemId: number,
    @Body() data: RecieptItemDto,
  ) {
    return await this.recieptItemUpdateUsecase.call(id, userProductId, itemId, data);
  }

  @Get('/item/:id')
  @Authorized()
  @HttpCode(200)
  async getRecieptItem(@Param('id') id: number) {
    return await this.recieptItemGetUsecase.call(id);
  }
}
