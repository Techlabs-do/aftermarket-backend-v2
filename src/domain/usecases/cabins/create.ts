import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CabinsService } from '@data/services/cabins.service';
import { CabinDto } from '@data/dtos/cabins/cabin.dto';

@Service()
export class CabinCreateUsecase {
  @Inject()
  cabin: CabinsService;

  public async call(data: CabinDto) {
    const result = await this.cabin.create(data.cabin);
    return new HttpResponse(result, false);
  }
}
