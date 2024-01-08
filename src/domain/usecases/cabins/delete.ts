import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CabinsService } from '@data/services/cabins.service';

@Service()
export class CabinDeleteUsecase {
  @Inject()
  cabin: CabinsService;

  public async call(id: number) {
    const result = await this.cabin.deleteById(id);
    return new HttpResponse(result, false);
  }
}
