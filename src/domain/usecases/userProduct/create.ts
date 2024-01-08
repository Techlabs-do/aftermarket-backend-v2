import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { UserProductDto } from '@data/dtos/products/product.dto';
import { UserProductService } from '@data/services/user-product.service';

@Service()
export class UserProductCreateUsecase {
  @Inject()
  userProduct: UserProductService;

  public async call(user_id: number, product_id: number, data: UserProductDto) {
    const result = await this.userProduct.create(user_id, product_id, data.code);
    return new HttpResponse(result, false);
  }
}
