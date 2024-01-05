import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ProductService } from '@data/services/product.service';

@Service()
export class ProductDeleteUsecase {
  @Inject()
  product: ProductService;

  public async call(id: string) {
    const result = await this.product.deleteById(Number(id));
    return new HttpResponse(result, false);
  }
}
