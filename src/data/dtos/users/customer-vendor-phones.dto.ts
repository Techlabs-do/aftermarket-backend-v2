import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
export class CustomerPhoneDto {
  @IsNotEmpty()
  @IsString()
  readonly number: string;

  @IsNotEmpty()
  @IsString()
  readonly contact_person: string;
}

export class VendorPhoneDto {
  @IsNotEmpty()
  @IsString()
  readonly number: string;

  @IsNotEmpty()
  @IsString()
  readonly contact_person: string;
}
export class CreateFrameworksDto {
  @IsNotEmpty()
  @IsString()
  readonly number: string;

  @IsNotEmpty()
  @IsString()
  readonly contact_person: string;
}

export class CustomerPhonesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFrameworksDto)
  readonly data: CreateFrameworksDto[];
}

export class VendorPhonesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFrameworksDto)
  readonly data: CreateFrameworksDto[];
}
