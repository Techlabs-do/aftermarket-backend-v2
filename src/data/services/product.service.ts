import { Service } from 'typedi';
import database from '@config/database';
import { ProductDto } from '@data/dtos/products/product.dto';

@Service()
export class ProductService {
  public products = database.instance.products;

  public async create(data: ProductDto) {
    const product = await this.products.create({
      data,
    });
    return {
      product,
    };
  }
  public async getById(id: number) {
    const product = await this.products.findFirst({
      where: {
        id,
      },
    });
    return {
      product,
    };
  }
  public async getAllProducts() {
    const products = await this.products.findMany({});
    return {
      products,
    };
  }
  public async deleteById(id: number) {
    const deletedProduct = await this.products.delete({
      where: {
        id,
      },
    });
    return {
      deletedProduct,
    };
  }
  public async updateProduct(id: number, data: ProductDto) {
    const updatedProduct = await this.products.update({
      where: {
        id,
      },
      data,
    });
    return {
      updatedProduct,
    };
  }
}
