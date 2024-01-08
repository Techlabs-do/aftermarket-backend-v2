import { Container } from 'typedi';
import { JsonController, HttpCode, Authorized, Post, UseBefore, Body, Get, Param, Delete, Put } from 'routing-controllers';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { CabinCreateUsecase } from '@domain/usecases/cabins/create';
import { CabinGetUsecase } from '@domain/usecases/cabins/getById';
import { CabinListUsecase } from '@domain/usecases/cabins/getAll';
import { CabinDeleteUsecase } from '@domain/usecases/cabins/delete';
import { CabinUpdateUsecase } from '@domain/usecases/cabins/update';
import { CabinDto } from '@data/dtos/cabins/cabin.dto';

@JsonController('/cabins')
export class CabinsController {
  public cabinCreateUsecase = Container.get(CabinCreateUsecase);
  public cabinGetUsecase = Container.get(CabinGetUsecase);
  public cabinListUsecase = Container.get(CabinListUsecase);
  public cabinDeleteUsecase = Container.get(CabinDeleteUsecase);
  public cabinUpdateUsecase = Container.get(CabinUpdateUsecase);

  @Post('/')
  @UseBefore(ValidationMiddleware(CabinDto))
  @Authorized()
  @HttpCode(201)
  async createRegion(@Body() regionData: CabinDto) {
    return await this.cabinCreateUsecase.call(regionData);
  }

  @Get('/:id')
  @Authorized()
  @HttpCode(200)
  async getRegion(@Param('id') id: number) {
    return await this.cabinGetUsecase.call(id);
  }

  @Get('/')
  @Authorized()
  @HttpCode(200)
  async getAll() {
    return await this.cabinListUsecase.call();
  }

  @Put('/:id')
  @Authorized()
  @HttpCode(200)
  async updateRegionById(@Param('id') id: number, @Body() data: CabinDto) {
    return await this.cabinUpdateUsecase.call(id, data);
  }

  @Delete('/:id')
  @Authorized()
  @HttpCode(200)
  async deleteRegion(@Param('id') id: number) {
    return await this.cabinDeleteUsecase.call(id);
  }
}
