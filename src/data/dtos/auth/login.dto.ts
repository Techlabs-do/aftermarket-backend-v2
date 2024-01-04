import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
