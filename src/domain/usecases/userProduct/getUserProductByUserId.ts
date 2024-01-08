import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { UserProductService } from '@data/services/user-product.service';

@Service()
export class UserProductListByUserIdUsecase {
  @Inject()
  userProduct: UserProductService;

  public async call(user_id: number) {
    const result = await this.userProduct.getUserProductsById(user_id);
    return new HttpResponse(result, false);
  }
}
