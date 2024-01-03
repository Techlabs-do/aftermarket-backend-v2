import { Container } from 'typedi';
import { LoginDto } from '@data/dtos/auth/login.dto';
import { SignupDto } from '@data/dtos/auth/signup.dto';
import { AuthLoginUsecase } from '@domain/usecases/auth/login';
import { SetPasswordDto } from '@data/dtos/auth/set_password.dto';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { ForgotPasswordDto } from '@data/dtos/auth/forgot_password.dto';
import { AuthSignupUsecase } from '@domain/usecases/auth/signup_by_email';
import { AuthSetPasswordUsecase } from '@domain/usecases/auth/set_password';
import { AuthForgetPassswordUsecase } from '@domain/usecases/auth/forget_password';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { AuthSetForgetPassswordUsecase } from '@domain/usecases/auth/set_forget_password';
import { JsonController, Body, Post, UseBefore, HttpCode, Req } from 'routing-controllers';
import { AuthResendEmailVerificationUsecase } from '@domain/usecases/auth/resend_verification_email';

@JsonController('/auth')
export class AuthController {
  public authLogin = Container.get(AuthLoginUsecase);
  public authSignUpUseCase = Container.get(AuthSignupUsecase);
  public authSetPassword = Container.get(AuthSetPasswordUsecase);
  public authForgotPasssword = Container.get(AuthForgetPassswordUsecase);
  public authResendEmail = Container.get(AuthResendEmailVerificationUsecase);
  public authSetForgotPasssword = Container.get(AuthSetForgetPassswordUsecase);

  @Post('/login')
  @UseBefore(ValidationMiddleware(LoginDto))
  @HttpCode(200)
  async login(@Body() loginData: LoginDto) {
    return await this.authLogin.call(loginData);
  }

  @Post('/signup-by-email')
  @UseBefore(ValidationMiddleware(SignupDto))
  @HttpCode(201)
  async signUpByEmail(@Body() userData: SignupDto) {
    return await this.authSignUpUseCase.call(userData);
  }

  @Post('/resend-verification-email/:email')
  async resendVerification(@Req() req: RequestWithUser) {
    const email = req.params.email;
    return await this.authResendEmail.call(email);
  }

  @Post('/set-password')
  @UseBefore(ValidationMiddleware(SetPasswordDto))
  @HttpCode(200)
  async setPassword(@Body() setPasswordDto: SetPasswordDto) {
    return await this.authSetPassword.call(setPasswordDto);
  }

  @Post('/forget-password')
  @HttpCode(200)
  async forgetPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authForgotPasssword.call(forgotPasswordDto);
  }

  @Post('/set-forget-password')
  @UseBefore(ValidationMiddleware(SetPasswordDto))
  @HttpCode(200)
  async setForgetPassword(@Body() setForgetPasswordDto: SetPasswordDto) {
    return await this.authSetForgotPasssword.call(setForgetPasswordDto);
  }
}
