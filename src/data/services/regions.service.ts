import { Service } from 'typedi';
import database from '@config/database';

@Service()
export class RegionsService {
  public region = database.instance.regions;

  public async create(region: string) {
    const insertedRegion = await this.region.create({
      data: {
        region,
      },
    });
    return insertedRegion;
  }

  public async getById(id: number) {
    const region = await this.region.findFirst({
      where: {
        id,
      },
    });
    return region;
  }

  public async deleteById(id: number) {
    const deletedRegion = await this.region.delete({
      where: {
        id,
      },
    });
    return deletedRegion;
  }
  public async updateRegion(id: number, region: string) {
    const updatedRegion = await this.region.update({
      where: {
        id,
      },
      data: {
        region,
      },
    });
    return updatedRegion;
  }
  public async listRegion() {
    const listRegion = await this.region.findMany({});
    return listRegion;
  }
}
