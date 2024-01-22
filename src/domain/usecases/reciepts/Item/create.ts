import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { RecieptItemDto } from '@data/dtos/reciepts/reciept.dto';
import { RecieptsService } from '@data/services/reciepts.service';

@Service()
export class RecieptItemCreateUsecase {
  @Inject()
  reciept: RecieptsService;

  public async call(reciept_id: number, user_product_id: number, data: RecieptItemDto) {
    const result = await this.reciept.createRecieptItem({ ...data, reciept_id, user_product_id });
    return new HttpResponse(result, false);
  }
}
