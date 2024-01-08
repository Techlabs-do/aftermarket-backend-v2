import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { RegionsService } from '@data/services/regions.service';

@Service()
export class RegionDeleteUsecase {
  @Inject()
  region: RegionsService;

  public async call(id: number) {
    const result = await this.region.deleteById(id);
    return new HttpResponse(result, false);
  }
}
