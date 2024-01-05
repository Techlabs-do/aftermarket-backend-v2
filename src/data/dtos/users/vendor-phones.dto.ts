import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class VendorPhoneDto {
  @IsNotEmpty()
  readonly number: string;

  @IsNotEmpty()
  readonly contact_person: string;
}

export class CreateFrameworksDto {
  @IsNotEmpty()
  readonly number: string;

  @IsNotEmpty()
  readonly contact_person: string;

  @IsNotEmpty()
  readonly user_id: number;
}

export class VendorPhonesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFrameworksDto)
  readonly data: CreateFrameworksDto[];
}
