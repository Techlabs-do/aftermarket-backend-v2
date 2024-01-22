import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ProductService } from '@data/services/product.service';

@Service()
export class ProductListUsecase {
  @Inject()
  product: ProductService;

  public async call() {
    const result = await this.product.getAllProducts();
    return new HttpResponse(result, false);
  }
}
