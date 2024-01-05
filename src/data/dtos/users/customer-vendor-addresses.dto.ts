import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
export class CustomerAddressDto {
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;
}

export class VendorAddressDto {
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;
}
export class CreateFrameworksDto {
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;
}

export class CustomerAddresssDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFrameworksDto)
  readonly data: CreateFrameworksDto[];
}

export class VendorAddresssDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFrameworksDto)
  readonly data: CreateFrameworksDto[];
}
