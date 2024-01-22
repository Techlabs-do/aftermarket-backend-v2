import { Container } from 'typedi';
import { JsonController, HttpCode, Authorized, Post, UseBefore, Body, Get, Param, Delete, Put } from 'routing-controllers';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { RegionDto } from '@data/dtos/region/region.dto';
import { RegionCreateUsecase } from '@domain/usecases/regions/create';
import { RegionGetUsecase } from '@domain/usecases/regions/getById';
import { RegionListUsecase } from '@domain/usecases/regions/getAll';
import { RegionDeleteUsecase } from '@domain/usecases/regions/delete';
import { RegionUpdateUsecase } from '@domain/usecases/regions/update';

@JsonController('/regions')
export class RegionsController {
  public regionCreateUsecase = Container.get(RegionCreateUsecase);
  public regionGetUsecase = Container.get(RegionGetUsecase);
  public regionListUsecase = Container.get(RegionListUsecase);
  public regionDeleteUsecase = Container.get(RegionDeleteUsecase);
  public regionUpdateUsecase = Container.get(RegionUpdateUsecase);

  @Post('/')
  @UseBefore(ValidationMiddleware(RegionDto))
  @Authorized()
  @HttpCode(201)
  async createRegion(@Body() regionData: RegionDto) {
    return await this.regionCreateUsecase.call(regionData);
  }

  @Get('/:id')
  @Authorized()
  @HttpCode(200)
  async getRegion(@Param('id') id: number) {
    return await this.regionGetUsecase.call(id);
  }

  @Get('/')
  @Authorized()
  @HttpCode(200)
  async getAll() {
    return await this.regionListUsecase.call();
  }

  @Put('/:id')
  @Authorized()
  @HttpCode(200)
  async updateRegionById(@Param('id') id: number, @Body() data: RegionDto) {
    return await this.regionUpdateUsecase.call(id, data);
  }

  @Delete('/:id')
  @Authorized()
  @HttpCode(200)
  async deleteRegion(@Param('id') id: number) {
    return await this.regionDeleteUsecase.call(id);
  }
}
