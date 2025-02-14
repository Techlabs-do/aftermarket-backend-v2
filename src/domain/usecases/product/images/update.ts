import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ProductImage } from '@data/services/product-image';
import { uploadtoS3 } from '@infrastructure/common/s3';
import { BUCKET, BUCKET_ENDPOINT } from '@config/environments';

@Service()
export class ProductImagesUpdateUsecase {
  @Inject()
  productImage: ProductImage;

  public async call(id: number, imageid: number, file: Express.Multer.File) {
    if (file) {
      const result = await this.productImage.checkIfExists(id, imageid);
      if (result) {
        const UploadedFile = await uploadtoS3(file, id);
        if (UploadedFile) {
          const result = await this.productImage.update(imageid, `${BUCKET_ENDPOINT}/${BUCKET}/${UploadedFile}`);
          return new HttpResponse(result, false);
        }
      }
      return new HttpResponse('Product and Image Id not Matched', true);
    }
    return new HttpResponse('No Image Found', true);
  }
}
