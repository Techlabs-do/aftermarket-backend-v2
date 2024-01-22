import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { RegionsService } from '@data/services/regions.service';

@Service()
export class RegionGetUsecase {
  @Inject()
  region: RegionsService;

  public async call(id: number) {
    const result = await this.region.getById(id);
    return new HttpResponse(result, false);
  }
}
