import { Container } from 'typedi';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { GetUsersUsecase } from '@domain/usecases/users/get_profile';
import { JsonController, Get, HttpCode, Req, Authorized } from 'routing-controllers';

@JsonController('/user')
export class UserController {
  public getUsersUsecase = Container.get(GetUsersUsecase);

  @Get('/')
  @Authorized()
  @HttpCode(200)
  async getUser(@Req() req: RequestWithUser) {
    return await this.getUsersUsecase.call(Number(req.user.id));
  }
}
