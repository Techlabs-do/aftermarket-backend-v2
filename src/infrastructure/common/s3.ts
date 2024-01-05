import { AWS_ACCESS_KEY, AWS_SECRET_KEY, BUCKET, BUCKET_ENDPOINT, REGION } from '@config/environments';
import { HttpException } from '@data/exceptions/http_exception';
import { S3 } from 'aws-sdk';

export const uploadtoS3 = async (file: Express.Multer.File, id: number) => {
  const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: REGION,
    endpoint: BUCKET_ENDPOINT,
  });
  try {
    const uploadParams: S3.Types.PutObjectRequest = {
      Bucket: BUCKET,
      Key: `AfterMarket/images/products/${id}/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    const s3UploadResponse = await s3.upload(uploadParams).promise();
    return s3UploadResponse.Key;
  } catch (error) {
    throw new HttpException(500, 'Error While UploadingImage');
  }
};
