import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { UserProductService } from '@data/services/user-product.service';

@Service()
export class UserProductGetUsecase {
  @Inject()
  userProduct: UserProductService;

  public async call(id: number, user_id: number, product_id: number) {
    const result = await this.userProduct.getByMappedId(id, user_id, product_id);
    return new HttpResponse(result, false);
  }
}
