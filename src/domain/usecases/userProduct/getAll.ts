import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { UserProductService } from '@data/services/user-product.service';

@Service()
export class UserProductListUsecase {
  @Inject()
  userProduct: UserProductService;

  public async call() {
    const result = await this.userProduct.getAllUserProducts();
    return new HttpResponse(result, false);
  }
}
