import { Container } from 'typedi';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { GetProfileUsecase } from '@domain/usecases/users/get_profile';
import { UpdateProfileUsecase } from '@domain/usecases/users/update_profile';
import { JsonController, Get, HttpCode, Req, Authorized } from 'routing-controllers';

@JsonController('/users')
export class UserController {
  public getProfileUsecase = Container.get(GetProfileUsecase);
  public updateProfileUsecase = Container.get(UpdateProfileUsecase);

  @Get('/profile')
  @Authorized()
  @HttpCode(200)
  async getProfile(@Req() req: RequestWithUser) {
    const user_id = req.user.id;
    return await this.getProfileUsecase.call(user_id);
  }
}
