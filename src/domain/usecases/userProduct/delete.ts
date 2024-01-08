import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { UserProductService } from '@data/services/user-product.service';

@Service()
export class UserProductDeleteUsecase {
  @Inject()
  userProduct: UserProductService;

  public async call(id: number) {
    const result = await this.userProduct.delete(id);
    return new HttpResponse(result, false);
  }
}
