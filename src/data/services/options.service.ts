import { Service } from 'typedi';
import database from '@config/database';
import { OptionDto } from '@data/dtos/options/options.dto';

@Service()
export class OptionsService {
  public option = database.instance.options;

  public async create(data: OptionDto) {
    const insertedOption = await this.option.create({
      data,
    });
    return insertedOption;
  }

  public async getById(id: number) {
    const option = await this.option.findFirst({
      where: {
        id,
      },
    });
    return option;
  }

  public async deleteById(id: number) {
    const deletedOption = await this.option.delete({
      where: {
        id,
      },
    });
    return deletedOption;
  }

  public async updateOption(id: number, data: OptionDto) {
    const updatedOption = await this.option.update({
      where: {
        id,
      },
      data,
    });
    return updatedOption;
  }

  public async listOption() {
    const listOption = await this.option.findMany({});
    return listOption;
  }
}
