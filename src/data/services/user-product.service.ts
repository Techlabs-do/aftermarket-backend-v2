import { Service } from 'typedi';
import database from '@config/database';

@Service()
export class UserProductService {
  public userHasProducts = database.instance.userHasProducts;

  public async create(user_id: number, products_id: number, code: string) {
    const createdUserProduct = await this.userHasProducts.create({
      data: {
        code,
        products_id,
        user_id,
      },
    });
    return createdUserProduct;
  }
  public async getByMappedId(id: number, user_id: number, products_id: number) {
    const userProduct = await this.userHasProducts.findFirst({
      where: {
        id,
        user_id,
        products_id,
      },
      include: {
        users: true,
        products: true,
      },
    });
    return userProduct;
  }
  public async getUserProductsById(user_id: number) {
    const userProduct = await this.userHasProducts.findFirst({
      where: {
        user_id,
      },
      include: {
        products: true,
        users: true,
      },
    });
    return userProduct;
  }

  public async getAllUserProducts() {
    const userProduct = await this.userHasProducts.findMany({
      include: {
        users: true,
        products: true,
      },
    });
    return userProduct;
  }
  public async delete(id: number) {
    const userProduct = await this.userHasProducts.delete({
      where: {
        id,
      },
    });
    return userProduct;
  }
  // public async getAllProducts() {
  //   const products = await this.products.findMany({
  //     include: {
  //       product_has_images: true,
  //       Product_has_options: true,
  //     },
  //   });
  //   return products;
  // }
  // public async deleteById(id: number) {
  //   const deletedProduct = await this.products.delete({
  //     where: {
  //       id,
  //     },
  //   });
  //   return deletedProduct;
  // }
  // public async updateProduct(id: number, data: ProductDto) {
  //   const updatedProduct = await this.products.update({
  //     where: {
  //       id,
  //     },
  //     data,
  //   });
  //   return updatedProduct;
  // }
}
