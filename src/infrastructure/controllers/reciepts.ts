import { Container } from 'typedi';
import { JsonController, HttpCode, Authorized, Post, UseBefore, Body, Param, Put } from 'routing-controllers';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { RecieptDto } from '@data/dtos/reciepts/reciept.dto';
import { UserRecieptCreateUsecase } from '@domain/usecases/reciepts/createUserReciept';
import { UserRecieptUpdateUsecase } from '@domain/usecases/reciepts/updateUserReciept';

@JsonController('/reciepts')
export class RecieptsController {
  public userRecieptCreateUsecase = Container.get(UserRecieptCreateUsecase);
  public userRecieptUpdateUsecase = Container.get(UserRecieptUpdateUsecase);

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
}
