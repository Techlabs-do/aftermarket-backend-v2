import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CabinsService } from '@data/services/cabins.service';
import { CabinDto } from '@data/dtos/cabins/cabin.dto';

@Service()
export class CabinUpdateUsecase {
  @Inject()
  cabin: CabinsService;

  public async call(id: number, data: CabinDto) {
    const result = await this.cabin.updateCabin(id, data.cabin);
    return new HttpResponse(result, false);
  }
}
