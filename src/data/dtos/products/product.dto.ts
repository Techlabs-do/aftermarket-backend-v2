import { IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly oem?: string;
}
