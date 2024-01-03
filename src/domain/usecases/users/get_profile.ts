import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { UserService } from '@data/services/users.service';

@Service()
export class GetProfileUsecase {
  @Inject()
  userService: UserService;

  public async call(user_id: string) {
    const user = await this.userService.findUserByIdWithRole(user_id);
    return new HttpResponse(user, false);
  }
}
