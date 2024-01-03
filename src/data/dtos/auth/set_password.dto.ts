import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SetPasswordDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  readonly newPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  readonly confirmPassword: string;
}
