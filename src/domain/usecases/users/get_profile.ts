import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { UserService } from '@data/services/users.service';

@Service()
export class GetUsersUsecase {
  @Inject()
  userService: UserService;

  public async call(id: number) {
    const user = await this.userService.findUser(id);
    return new HttpResponse(user, false);
  }
}
