import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ProductImage } from '@data/services/product-image';
import { uploadtoS3 } from '@infrastructure/common/s3';
import { BUCKET, BUCKET_ENDPOINT } from '@config/environments';

@Service()
export class ProductImagesCreateUsecase {
  @Inject()
  productImage: ProductImage;

  public async call(id: string, file?: Express.Multer.File) {
    if (file) {
      const UploadedFile = await uploadtoS3(file, Number(id));
      if (UploadedFile) {
        const inserteddata = {
          product_id: Number(id),
          url: `${BUCKET_ENDPOINT}/${BUCKET}/${UploadedFile}`,
        };
        const result = await this.productImage.create(inserteddata);
        return new HttpResponse(result, false);
      }
    }
    return new HttpResponse('No Image Found', true);
  }
}
