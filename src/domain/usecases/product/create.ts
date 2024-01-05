import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ProductDto } from '@data/dtos/products/product.dto';
import { ProductService } from '@data/services/product.service';

@Service()
export class ProductCreateUsecase {
  @Inject()
  product: ProductService;

  public async call(data: ProductDto) {
    const result = await this.product.create(data);
    return new HttpResponse(result, false);
  }
}
