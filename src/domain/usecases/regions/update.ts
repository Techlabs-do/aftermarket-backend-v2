import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { RegionsService } from '@data/services/regions.service';
import { RegionDto } from '@data/dtos/region/region.dto';

@Service()
export class RegionUpdateUsecase {
  @Inject()
  region: RegionsService;

  public async call(id: number, data: RegionDto) {
    const result = await this.region.updateRegion(id, data.region);
    return new HttpResponse(result, false);
  }
}
