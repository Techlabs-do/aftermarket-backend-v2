import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OptionDto {
  @IsString()
  readonly option: string;

  @IsNumber()
  @IsOptional()
  readonly parent_id?: number;
}
