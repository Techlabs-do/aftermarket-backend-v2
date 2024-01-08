import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RECIEPT_TYPES, RECIEPT_STATUS } from '@prisma/client';

export class RecieptDto {
  @IsEnum(RECIEPT_TYPES, { each: true })
  readonly type: RECIEPT_TYPES;

  @IsEnum(RECIEPT_STATUS, { each: true })
  readonly status: RECIEPT_STATUS;

  @IsString()
  readonly currency: string;
}

export class ExtendedRecieptDto extends RecieptDto {
  @IsNumber()
  readonly user_id: number;
}
