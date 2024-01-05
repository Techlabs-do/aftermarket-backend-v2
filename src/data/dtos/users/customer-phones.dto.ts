import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
export class CustomerPhoneDto {
  @IsNotEmpty()
  @IsString()
  readonly number: string;

  @IsNotEmpty()
  @IsNumber()
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

export class CustomerPhonesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFrameworksDto)
  readonly data: CreateFrameworksDto[];
}
