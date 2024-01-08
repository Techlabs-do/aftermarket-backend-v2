import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { RegionsService } from '@data/services/regions.service';

@Service()
export class RegionListUsecase {
  @Inject()
  region: RegionsService;

  public async call() {
    const result = await this.region.listRegion();
    return new HttpResponse(result, false);
  }
}
