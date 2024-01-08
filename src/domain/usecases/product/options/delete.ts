import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ProductOptions } from '@data/services/product-options.service';

@Service()
export class ProductOptionsDeleteUsecase {
  @Inject()
  product: ProductOptions;

  public async call(product_id: number, id: number) {
    const result = await this.product.delete(product_id, id);
    return new HttpResponse(result, false);
  }
}
