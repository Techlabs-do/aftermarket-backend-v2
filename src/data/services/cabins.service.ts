import { Service } from 'typedi';
import database from '@config/database';

@Service()
export class CabinsService {
  public cabin = database.instance.cabins;

  public async create(cabin: string) {
    const insertedCabin = await this.cabin.create({
      data: {
        cabin,
      },
    });
    return insertedCabin;
  }

  public async getById(id: number) {
    const cabin = await this.cabin.findFirst({
      where: {
        id,
      },
    });
    return cabin;
  }

  public async deleteById(id: number) {
    const deletedcabin = await this.cabin.delete({
      where: {
        id,
      },
    });
    return deletedcabin;
  }
  public async updateCabin(id: number, cabin: string) {
    const updatedcabin = await this.cabin.update({
      where: {
        id,
      },
      data: {
        cabin,
      },
    });
    return updatedcabin;
  }
  public async listcabin() {
    const listCabin = await this.cabin.findMany({});
    return listCabin;
  }
}
