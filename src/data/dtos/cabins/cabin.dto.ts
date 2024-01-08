import { IsString } from 'class-validator';

export class CabinDto {
  @IsString()
  readonly cabin: string;
}
