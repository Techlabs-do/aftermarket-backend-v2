import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ProductHasOptionsDto } from '@data/dtos/products/product.dto';
import { ProductOptions } from '@data/services/product-options.service';

@Service()
export class ProductOptionsCreateUsecase {
  @Inject()
  product: ProductOptions;

  public async call(product_id: number, data: ProductHasOptionsDto) {
    const result = await this.product.create({ ...data, product_id });
    return new HttpResponse(result, false);
  }
}
