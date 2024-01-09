import { Service } from 'typedi';
import database from '@config/database';
import { ExtendedRecieptDto, ExtendedRecieptItemDto, RecieptDto } from '@data/dtos/reciepts/reciept.dto';

@Service()
export class RecieptsService {
  public reciepts = database.instance.reciepts;
  public recieptItem = database.instance.recieptItem;

  public async create(data: ExtendedRecieptDto) {
    const createdReciept = await this.reciepts.create({
      data,
    });
    return createdReciept;
  }

  public async update(id: number, data: RecieptDto) {
    const updatedReciept = await this.reciepts.update({
      where: {
        id,
      },
      data,
    });
    return updatedReciept;
  }

  public async get(id: number) {
    const reciept = await this.reciepts.findFirst({
      where: {
        id,
      },
      include: {
        reciept_item: true,
      },
    });
    return reciept;
  }

  public async createRecieptItem(data: ExtendedRecieptItemDto) {
    const createdRecieptItem = await this.recieptItem.create({
      data,
    });
    return createdRecieptItem;
  }

  public async updateRecieptItem(id, data: ExtendedRecieptItemDto) {
    const updatedRecieptItem = await this.recieptItem.update({
      where: {
        id,
      },
      data,
    });
    return updatedRecieptItem;
  }

  public async getRecieptItem(id: number) {
    const reciept = await this.recieptItem.findFirst({
      where: {
        id,
      },
      include: {
        reciepts: true,
        user_products: true,
      },
    });
    return reciept;
  }
}
