import 'reflect-metadata';
import { AuthService } from '@data/services/auth.service';
import { SignupDto } from '@data/dtos/auth/signup.dto';
import { AuthSignupUsecase } from '@domain/usecases/auth/signup_by_email';

// Mocking AuthService methods for testing purposes
jest.mock('@data/services/auth.service', () => {
    return {
        AuthService: jest.fn().mockImplementation(() => ({
            signUpByEmail: jest.fn(),
        })),
    };
});

describe('AuthSignupUsecase', () => {
    let authSignupUsecase: AuthSignupUsecase;
    let mockedAuthService: jest.Mocked<AuthService>;

    beforeEach(() => {
        const authServiceInstance = new AuthService() as jest.Mocked<AuthService>;
        mockedAuthService = authServiceInstance;
        authSignupUsecase = new AuthSignupUsecase();
        authSignupUsecase.auth = authServiceInstance;
    });

    it('should call signUpByEmail method with correct data', async () => {
        const userData: SignupDto = {
            email: 'test@example.com',
            password: 'password123',
        };

        const mockResponse = {
            id: 123,
            email: 'test@example.com',
        };

        // Mocking the signUpByEmail method with a predefined response
        mockedAuthService.signUpByEmail.mockResolvedValue(mockResponse);

        const result = await authSignupUsecase.call(userData);

        expect(mockedAuthService.signUpByEmail).toHaveBeenCalledWith(userData);
        expect(result.data).toEqual(mockResponse);
        expect(result.error).toBeFalsy();
    });

    it('should throw an error if signUpByEmail method throws an error', async () => {
        const userData: SignupDto = {
            email: 'test@example.com',
            password: 'password123',
        };

        const errorMessage = 'An error occurred during signup';

        // Mocking the signUpByEmail method to throw an error
        mockedAuthService.signUpByEmail.mockRejectedValue({
            statusCode: 500,
            message: errorMessage,
        });

        try {
            await authSignupUsecase.call(userData);
        } catch (error) {
            expect(error.statusCode).toEqual(500);
            expect(error.message).toEqual(errorMessage);
        }
    });
});
