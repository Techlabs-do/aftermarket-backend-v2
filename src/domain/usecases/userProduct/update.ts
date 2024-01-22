import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { UserProductDto } from '@data/dtos/products/product.dto';
import { UserProductService } from '@data/services/user-product.service';

@Service()
export class UserProductUpdateUsecase {
  @Inject()
  userProduct: UserProductService;

  public async call(id: number, data: UserProductDto) {
    const result = await this.userProduct.update(id, data.code);
    return new HttpResponse(result, false);
  }
}
