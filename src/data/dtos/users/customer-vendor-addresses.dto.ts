import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
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
