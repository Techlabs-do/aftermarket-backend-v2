import { Container } from 'typedi';
import { SignupDto } from '@data/dtos/auth/signup.dto';
import { AuthSignupUsecase } from '@domain/usecases/auth/signup_by_email';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { JsonController, Body, Post, UseBefore, HttpCode, Req, Res } from 'routing-controllers';
import { LoginDto } from '@data/dtos/auth/login.dto';
import passport from 'passport';
import { JWT_SECRET, SECRET_KEY_HEADER } from '@config/environments';
import jwt from 'jsonwebtoken';
import { AuthService } from '@data/services/auth.service';
import { Request } from 'express';
import { HttpException } from '@data/exceptions/http_exception';
import { ForgotPasswordDto } from '@data/dtos/auth/forgot_password.dto';
import { AuthForgetPasswordUseCase } from '@domain/usecases/auth/forget_password';

@JsonController('/auth')
export class AuthController {
  public authSignUpUseCase = Container.get(AuthSignupUsecase);
  public authForgetPasswordUseCase = Container.get(AuthForgetPasswordUseCase);
  public authServices = Container.get(AuthService);

  @Post('/signup')
  @UseBefore(ValidationMiddleware(SignupDto))
  @HttpCode(201)
  async signUpByEmail(@Body() userData: SignupDto, @Req() req: Request) {
    const { headers } = req;
    if (!('secret-key' in headers) && headers['secret-key'] !== SECRET_KEY_HEADER) {
      throw new HttpException(400, 'UnAuthorized Access');
    }
    return await this.authSignUpUseCase.call(userData);
  }

  @Post('/login')
  @UseBefore(ValidationMiddleware(LoginDto))
  @HttpCode(200)
  async login(@Body() userData: LoginDto, @Req() req: any, @Res() res: any) {
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

  @Post('/forgetPassword')
  @UseBefore(ValidationMiddleware(ForgotPasswordDto))
  @HttpCode(201)
  async forgetPassword(@Body() userData: ForgotPasswordDto, @Req() req: Request) {
    const { headers } = req;
    if (!('secret-key' in headers) && headers['secret-key'] !== SECRET_KEY_HEADER) {
      throw new HttpException(400, 'UnAuthorized Access');
    }
    return await this.authForgetPasswordUseCase.call(userData);
  }
}
