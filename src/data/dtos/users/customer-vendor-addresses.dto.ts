import { IsNotEmpty } from 'class-validator';

export class CustomerAddresssDto {
  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly country: string;

  @IsNotEmpty()
  readonly user_id: number;
}
[];

export class CustomerAddressDto {
  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly country: string;
}

export class VendorAddresssDto {
  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly country: string;

  @IsNotEmpty()
  readonly user_id: number;
}
[];

export class VendorAddressDto {
  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly country: string;
}
