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
        reciept_item: true,
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
        reciept_item: true,
      },
    });
    return userProduct;
  }

  public async getAllUserProducts() {
    const userProduct = await this.userHasProducts.findMany({
      include: {
        users: true,
        products: true,
        reciept_item: true,
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
  public async update(id: number, code: string) {
    const updatedProduct = await this.userHasProducts.update({
      where: {
        id,
      },
      data: {
        code,
      },
    });
    return updatedProduct;
  }
}
