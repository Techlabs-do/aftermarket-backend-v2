import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { RegionsService } from '@data/services/regions.service';
import { RegionDto } from '@data/dtos/region/region.dto';

@Service()
export class RegionCreateUsecase {
  @Inject()
  region: RegionsService;

  public async call(data: RegionDto) {
    const result = await this.region.create(data.region);
    return new HttpResponse(result, false);
  }
}
