import { Container } from 'typedi';
import { JsonController, HttpCode, Authorized, Post, UseBefore, Body, Get, Param, Delete, Put } from 'routing-controllers';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { OptionDto } from '@data/dtos/options/options.dto';
import { OptionCreateUsecase } from '@domain/usecases/options/create';
import { OptionListUsecase } from '@domain/usecases/options/getAll';
import { OptionDeleteUsecase } from '@domain/usecases/options/delete';
import { OptionGetUsecase } from '@domain/usecases/options/getById';
import { OptionUpdateUsecase } from '@domain/usecases/options/update';

@JsonController('/options')
export class OptionsController {
  public optionCreateUsecase = Container.get(OptionCreateUsecase);
  public optionGetUsecase = Container.get(OptionGetUsecase);
  public optionListUsecase = Container.get(OptionListUsecase);
  public optionUpdateUsecase = Container.get(OptionUpdateUsecase);
  public optionDeleteUsecase = Container.get(OptionDeleteUsecase);

  @Post('/')
  @UseBefore(ValidationMiddleware(OptionDto))
  @Authorized()
  @HttpCode(201)
  async createOption(@Body() optionData: OptionDto) {
    return await this.optionCreateUsecase.call(optionData);
  }

  @Get('/:id')
  @Authorized()
  @HttpCode(200)
  async getOption(@Param('id') id: number) {
    return await this.optionGetUsecase.call(id);
  }

  @Get('/')
  @Authorized()
  @HttpCode(200)
  async getAll() {
    return await this.optionListUsecase.call();
  }

  @Put('/:id')
  @Authorized()
  @HttpCode(200)
  async updateOptionById(@Param('id') id: number, @Body() data: OptionDto) {
    return await this.optionUpdateUsecase.call(id, data);
  }

  @Delete('/:id')
  @Authorized()
  @HttpCode(200)
  async deleteOption(@Param('id') id: number) {
    return await this.optionDeleteUsecase.call(id);
  }
}
