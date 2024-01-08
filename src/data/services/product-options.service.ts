import { Service } from 'typedi';
import database from '@config/database';
import { ExtendedProductHasOptionsDto } from '@data/dtos/products/product.dto';

@Service()
export class ProductOptions {
  public productOptions = database.instance.productHasOptions;

  public async create(data: ExtendedProductHasOptionsDto) {
    const product = await this.productOptions.create({
      data,
    });
    return product;
  }

  public async delete(product_id: number, id: number) {
    const product = await this.productOptions.delete({
      where: {
        id,
        product_id,
      },
    });
    return product;
  }
}
