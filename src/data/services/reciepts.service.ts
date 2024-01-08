import { Service } from 'typedi';
import database from '@config/database';
import { ExtendedRecieptDto, RecieptDto } from '@data/dtos/reciepts/reciept.dto';

@Service()
export class RecieptsService {
  public reciepts = database.instance.reciepts;

  public async create(data: ExtendedRecieptDto) {
    const createdReciept = await this.reciepts.create({
      data,
    });
    return createdReciept;
  }

  public async update(id: number, data: RecieptDto) {
    const updatedProduct = await this.reciepts.update({
      where: {
        id,
      },
      data,
    });
    return updatedProduct;
  }
}
