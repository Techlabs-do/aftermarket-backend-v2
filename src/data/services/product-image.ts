import { Service } from 'typedi';
import database from '@config/database';
import { ProductImageDto } from '@data/dtos/products/product.dto';

@Service()
export class ProductImage {
  public productImage = database.instance.productHasImages;
  public products = database.instance.products;

  public async create(data: ProductImageDto) {
    const productImage = await this.productImage.create({
      data,
    });
    return {
      productImage,
    };
  }
  public async deleteById(id: number, imageid: number) {
    const existingProduct = await this.products.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingProduct) {
      throw new Error(`Product with id ${id} does not exist.`);
    }

    const existingProductImage = await this.productImage.findUnique({
      where: {
        id: imageid,
        product_id: id,
      },
    });

    if (!existingProductImage) {
      throw new Error(`Product image with id ${imageid} and product_id ${id} does not exist.`);
    }

    return await this.productImage.delete({
      where: {
        id: imageid,
      },
    });
  }

  public async checkIfExists(id: number, imageid: number) {
    const existingProduct = await this.products.findUnique({
      where: {
        id: id,
      },
    });

    const existingProductImage = await this.productImage.findUnique({
      where: {
        id: imageid,
        product_id: id,
      },
    });

    return !!existingProduct && !!existingProductImage;
  }
  public async update(id: number, url: string) {
    const updateImage = await this.productImage.update({
      where: {
        id,
      },
      data: {
        url,
      },
    });

    return updateImage;
  }
}
