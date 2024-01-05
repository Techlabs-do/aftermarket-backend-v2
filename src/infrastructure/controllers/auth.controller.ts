import { Container } from 'typedi';
import { SignupDto } from '@data/dtos/auth/signup.dto';
import { JWT_SECRET, SECRET_KEY, SECRET_KEY_HEADER } from '@config/environments';
import { AuthSignupUsecase } from '@domain/usecases/auth/signup_by_email';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { JsonController, Body, Post, UseBefore, HttpCode, Req, Res } from 'routing-controllers';
import { LoginDto } from '@data/dtos/auth/login.dto';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { AuthService } from '@data/services/auth.service';
import { ForgotPasswordDto } from '@data/dtos/auth/forgot_password.dto';
import { AuthForgetPasswordUseCase } from '@domain/usecases/auth/forget_password';
import { HeaderValidationMiddleware } from '@infrastructure/middlewares/header_validation.middleware';

@JsonController('/auth')
export class AuthController {
  public authSignUpUseCase = Container.get(AuthSignupUsecase);
  public authForgetPasswordUseCase = Container.get(AuthForgetPasswordUseCase);
  public authServices = Container.get(AuthService);

  @Post('/signup')
  @UseBefore(HeaderValidationMiddleware(SECRET_KEY, 'Secret Key does not exist', SECRET_KEY_HEADER))
  @UseBefore(ValidationMiddleware(SignupDto))
  @HttpCode(201)
  async signUpByEmail(@Body() userData: SignupDto) {
    return await this.authSignUpUseCase.call(userData);
  }

  @Post('/login')
  @UseBefore(ValidationMiddleware(LoginDto))
  @HttpCode(200)
  async login(@Req() req: any, @Res() res: any) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', { session: true }, (err, user) => {
        if (err || !user) {
          return reject({ message: 'Invalid credentials' });
        }
        req.login(user, loginErr => {
          if (loginErr) {
            return reject({ message: 'Login error' });
          }

          const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' });

          resolve({ token });
        });
      })(req, res);
    });
  }

  @Post('/forget-password')
  @UseBefore(HeaderValidationMiddleware(SECRET_KEY, 'Secret Key does not exist', SECRET_KEY_HEADER))
  @UseBefore(ValidationMiddleware(ForgotPasswordDto))
  @HttpCode(200)
  forgetPassword(@Body() userData: ForgotPasswordDto) {
    return this.authForgetPasswordUseCase.call(userData);
  }
}
