import { IsString } from 'class-validator';

export class RegionDto {
  @IsString()
  readonly region: string;
}
