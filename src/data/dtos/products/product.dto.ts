import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly oem?: string;
}
export class ProductImageDto {
  @IsString()
  readonly url: string;

  @IsNumber()
  readonly product_id: number;
}

export class ProductHasOptionsDto {
  @IsString()
  @IsOptional()
  readonly year?: string;

  @IsOptional()
  @IsString()
  readonly chasses_number?: string;

  @IsNumber()
  readonly options_id: number;

  @IsNumber()
  readonly regions_id: number;

  @IsNumber()
  @IsOptional()
  readonly cabin_id?: number;
}

export class ExtendedProductHasOptionsDto extends ProductHasOptionsDto {
  @IsNumber()
  readonly product_id: number;
}
