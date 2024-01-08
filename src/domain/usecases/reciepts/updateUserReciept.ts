import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { RecieptDto } from '@data/dtos/reciepts/reciept.dto';
import { RecieptsService } from '@data/services/reciepts.service';

@Service()
export class UserRecieptUpdateUsecase {
  @Inject()
  reciept: RecieptsService;

  public async call(id: number, data: RecieptDto) {
    const result = await this.reciept.update(id, data);
    return new HttpResponse(result, false);
  }
}
