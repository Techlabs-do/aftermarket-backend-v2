import { USER_TYPES } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CustomerVendorDto {
  @IsOptional()
  @IsString()
  readonly company_name?: string;

  @IsOptional()
  @IsString()
  readonly website?: string;

  @IsOptional()
  @IsString()
  readonly email?: string;
}

export class ExtendedCustomerVendorDto extends CustomerVendorDto {
  @IsEnum(USER_TYPES, { each: true })
  readonly type: USER_TYPES;
}
