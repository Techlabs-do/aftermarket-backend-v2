import { IsNotEmpty } from 'class-validator';

export class CustomerPhonesDto {
  @IsNotEmpty()
  readonly number: string;

  @IsNotEmpty()
  readonly contact_person: string;

  @IsNotEmpty()
  readonly user_id: number;
}
[];

export class CustomerPhoneDto {
  @IsNotEmpty()
  readonly number: string;

  @IsNotEmpty()
  readonly contact_person: string;
}
