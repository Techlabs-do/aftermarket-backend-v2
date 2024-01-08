import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CabinsService } from '@data/services/cabins.service';

@Service()
export class CabinListUsecase {
  @Inject()
  cabin: CabinsService;

  public async call() {
    const result = await this.cabin.listcabin();
    return new HttpResponse(result, false);
  }
}
