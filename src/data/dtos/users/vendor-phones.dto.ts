import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export class VendorPhoneDto {
  @IsNotEmpty()
  @IsNumber()
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

  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;
}

export class VendorPhonesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFrameworksDto)
  readonly data: CreateFrameworksDto[];
}
