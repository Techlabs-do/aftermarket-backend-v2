import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { RecieptDto } from '@data/dtos/reciepts/reciept.dto';
import { RecieptsService } from '@data/services/reciepts.service';

@Service()
export class UserRecieptCreateUsecase {
  @Inject()
  reciept: RecieptsService;

  public async call(user_id: number, data: RecieptDto) {
    const result = await this.reciept.create({ ...data, user_id });
    return new HttpResponse(result, false);
  }
}
