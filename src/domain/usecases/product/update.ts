import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ProductDto } from '@data/dtos/products/product.dto';
import { ProductService } from '@data/services/product.service';

@Service()
export class ProductUpdateUsecase {
  @Inject()
  product: ProductService;

  public async call(id: number, data: ProductDto) {
    const result = await this.product.updateProduct(id, data);
    return new HttpResponse(result, false);
  }
}
