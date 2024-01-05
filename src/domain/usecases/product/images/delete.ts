import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ProductImage } from '@data/services/product-image';

@Service()
export class ProductImagesDeleteUsecase {
  @Inject()
  productImage: ProductImage;

  public async call(id: string, imageid: string) {
    const result = await this.productImage.deleteById(Number(id), Number(imageid));
    return new HttpResponse(result, false);
  }
}
