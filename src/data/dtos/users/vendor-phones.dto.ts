import { IsNotEmpty } from 'class-validator';

export class VendorPhonesDto {
  @IsNotEmpty()
  readonly number: string;

  @IsNotEmpty()
  readonly contact_person: string;

  @IsNotEmpty()
  readonly user_id: number;
}
[];

export class VendorPhoneDto {
  @IsNotEmpty()
  readonly number: string;

  @IsNotEmpty()
  readonly contact_person: string;
}
