import { Container } from 'typedi';
import { JsonController, Get, HttpCode, Authorized, Post, UseBefore, Body, Param, Delete, Put, UploadedFile } from 'routing-controllers';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { ProductDto, ProductHasOptionsDto } from '@data/dtos/products/product.dto';
import { ProductCreateUsecase } from '@domain/usecases/product/create';
import { ProductGetUsecase } from '@domain/usecases/product/getById';
import { ProductListUsecase } from '@domain/usecases/product/list';
import { ProductDeleteUsecase } from '@domain/usecases/product/delete';
import { ProductUpdateUsecase } from '@domain/usecases/product/update';
import { ProductImagesCreateUsecase } from '@domain/usecases/product/images/create';
import { ProductImagesDeleteUsecase } from '@domain/usecases/product/images/delete';
import { ProductImagesUpdateUsecase } from '@domain/usecases/product/images/update';
import { ProductOptionsCreateUsecase } from '@domain/usecases/product/options/create';
import { ProductOptionsDeleteUsecase } from '@domain/usecases/product/options/delete';

@JsonController('/product')
export class ProductController {
  public productCreateUsecase = Container.get(ProductCreateUsecase);
  public productGetUsecase = Container.get(ProductGetUsecase);
  public productListUsecase = Container.get(ProductListUsecase);
  public productDeleteUsecase = Container.get(ProductDeleteUsecase);
  public productUpdateUsecase = Container.get(ProductUpdateUsecase);
  //ProductImages
  public productImagesCreateUsecase = Container.get(ProductImagesCreateUsecase);
  public productImagesDeleteUsecase = Container.get(ProductImagesDeleteUsecase);
  public productImagesUpdateUsecase = Container.get(ProductImagesUpdateUsecase);
  //ProductOptions
  public productOptionsCreateUsecase = Container.get(ProductOptionsCreateUsecase);
  public productOptionsDeleteUsecase = Container.get(ProductOptionsDeleteUsecase);

  @Post('/')
  @UseBefore(ValidationMiddleware(ProductDto))
  @Authorized()
  @HttpCode(201)
  async createProduct(@Body() data: ProductDto) {
    return await this.productCreateUsecase.call(data);
  }

  @Get('/:id')
  @Authorized()
  @HttpCode(200)
  async getProduct(@Param('id') id: number) {
    return await this.productGetUsecase.call(id);
  }

  @Get('/')
  @Authorized()
  @HttpCode(200)
  async getAllProducts() {
    return await this.productListUsecase.call();
  }

  @Delete('/:id')
  @Authorized()
  @HttpCode(200)
  async deleteProduct(@Param('id') id: number) {
    return await this.productDeleteUsecase.call(id);
  }

  @Put('/:id')
  @Authorized()
  @HttpCode(200)
  async updatePhoneById(@Param('id') id: number, @Body() data: ProductDto) {
    return await this.productUpdateUsecase.call(id, data);
  }

  //ProductImages
  @Post('/:id/image')
  @Authorized()
  @HttpCode(201)
  async productImage(@Param('id') id: number, @UploadedFile('profile') file?: Express.Multer.File) {
    return await this.productImagesCreateUsecase.call(id, file);
  }

  @Delete('/:id/image/:imageId')
  @Authorized()
  @HttpCode(200)
  async deleteImage(@Param('id') id: number, @Param('imageId') imageId: number) {
    return await this.productImagesDeleteUsecase.call(id, imageId);
  }

  @Put('/:id/image/:imageId')
  @Authorized()
  @HttpCode(200)
  async updateImage(@Param('id') id: number, @Param('imageId') imageId: number, @UploadedFile('profile') file: Express.Multer.File) {
    return await this.productImagesUpdateUsecase.call(id, imageId, file);
  }

  //ProductOptions
  @Post('/:productId/options')
  @UseBefore(ValidationMiddleware(ProductHasOptionsDto))
  @Authorized()
  @HttpCode(201)
  async createProductOptions(@Param('productId') productId: number, @Body() data: ProductHasOptionsDto) {
    return await this.productOptionsCreateUsecase.call(productId, data);
  }

  @Delete('/:productId/option/:id')
  @Authorized()
  @HttpCode(200)
  async deleteProductOption(@Param('productId') productId: number, @Param('id') id: number) {
    return await this.productOptionsDeleteUsecase.call(productId, id);
  }
}
