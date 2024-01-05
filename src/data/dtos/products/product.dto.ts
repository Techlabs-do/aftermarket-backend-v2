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
