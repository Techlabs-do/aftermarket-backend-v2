import { Service } from 'typedi';
import { LoginDto } from '@data/dtos/auth/login.dto';
import { SignupDto } from '@data/dtos/auth/signup.dto';
import { AuthUser } from '@data/interfaces/auth.interface';
import { HttpException } from '@data/exceptions/http_exception';
import { SetPasswordDto } from '@data/dtos/auth/set_password.dto';
import { UpdateProfileDto } from '@data/dtos/users/update_profile.dto';
import { ForgotPasswordDto } from '@data/dtos/auth/forgot_password.dto';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_CONNECTION_ID, AUTH0_USER_PASSWORD } from '@config/environments';
import { AuthenticationClient, ManagementClient, UserCreate as AuthUserCreate, PostPasswordChangeRequest, UserUpdate as AuthUserUpdate } from 'auth0';

@Service()
export class AuthService {
  private management = new ManagementClient({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
  });

  private authentication = new AuthenticationClient({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
  });

  // get user by email
  public async getAuth0UserByEmail(email: string) {
    return await this.management.usersByEmail.getByEmail({ email: email });
  }

  //create user
  public async signUpByEmail(userData: SignupDto): Promise<Omit<AuthUser, 'role'>> {
    try {
      const auth0UserData: AuthUserCreate = {
        email: userData.email,
        password: AUTH0_USER_PASSWORD,
        connection: 'Username-Password-Authentication',
      };

      const createdUser = await this.management.users.create(auth0UserData);
      return {
        id: createdUser.data.user_id,
        email: createdUser.data.email,
      };
    } catch (error) {
      const err = error as any;
      throw new HttpException(err.statusCode || 500, err.message);
    }
  }

  public async resendVerificationEmail(userId: string): Promise<void> {
    try {
      const resendEmailData = {
        user_id: userId,
        client_id: AUTH0_CLIENT_ID,
      };

      await this.management.jobs.verifyEmail(resendEmailData);
    } catch (error) {
      const err = error as any;
      throw new HttpException(err.statusCode || 500, err.message);
    }
  }

  // update profile
  public async updateAuthProfile(updateProfileDto: UpdateProfileDto): Promise<boolean> {
    try {
      const { email, firstName, lastName } = updateProfileDto;
      const response = await this.management.usersByEmail.getByEmail({ email: email });
      if (response.data.length) {
        const user_id = response.data[0].user_id;
        const profileData: AuthUserUpdate = {
          given_name: firstName,
          family_name: lastName,
        };
        await this.management.users.update({ id: user_id }, profileData);
        return true;
      }

      throw new HttpException(400, 'User not found');
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  }

  public async updateAuthProfilePciture(email: string, url: string): Promise<boolean> {
    try {
      const response = await this.management.usersByEmail.getByEmail({ email: email });
      if (response.data) {
        const user_id = response.data[0].user_id;
        const profileData: AuthUserUpdate = { picture: url };
        await this.management.users.update({ id: user_id }, profileData);
        return true;
      }

      throw new HttpException(400, 'User not found');
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  }

  //forget password
  public async forgetPassword(forgotPasswordDto: ForgotPasswordDto): Promise<string> {
    const { email } = forgotPasswordDto;
    try {
      const ticketParams: PostPasswordChangeRequest = {
        email,
        connection_id: AUTH0_CONNECTION_ID,
      };
      const resetTicket = await this.management.tickets.changePassword(ticketParams);
      return resetTicket.data.ticket;
    } catch (error) {
      const err = error as any;
      throw new HttpException(err.statusCode || 500, err.message);
    }
  }

  //set password
  public async setPassword(setPasswordDto: SetPasswordDto): Promise<string> {
    const { email, newPassword } = setPasswordDto;

    try {
      const response = await this.getAuth0UserByEmail(email);
      if (response.data) {
        const user_id = response.data[0].user_id;
        await this.management.users.update({ id: user_id }, { password: newPassword });

        return user_id;
      }
      throw new HttpException(400, 'User not found');
    } catch (error) {
      const err = error as any;
      throw new HttpException(err.statusCode || 500, err.message);
    }
  }

  //update-profile
  public async updateProfile(updateProfileDto: UpdateProfileDto): Promise<boolean> {
    try {
      const { email } = updateProfileDto;
      const response = await this.management.usersByEmail.getByEmail({ email: email });
      if (response.data) {
        const user_id = response.data[0].user_id;
        const profileData: AuthUserUpdate = {
          given_name: updateProfileDto.firstName,
          family_name: updateProfileDto.lastName,
        };
        await this.management.users.update({ id: user_id }, profileData);
        return true;
      }

      throw new HttpException(400, 'User not found');
    } catch (error) {
      const err = error as any;
      throw new HttpException(err.statusCode || 500, err.message);
    }
  }

  //Login user
  public async loginUser(body: LoginDto) {
    try {
      return await this.authentication.oauth.passwordGrant({
        username: body.email,
        password: body.password,
        realm: 'Username-Password-Authentication',
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
      });
    } catch (error) {
      throw new Error(error.message ?? 'Failed to login');
    }
  }
}
