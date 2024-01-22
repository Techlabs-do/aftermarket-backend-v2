import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { RecieptsService } from '@data/services/reciepts.service';

@Service()
export class UserRecieptGetUsecase {
  @Inject()
  reciept: RecieptsService;

  public async call(id: number) {
    const result = await this.reciept.get(id);
    return new HttpResponse(result, false);
  }
}
