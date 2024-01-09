import 'reflect-metadata';
import { AuthForgetPasswordUseCase } from "@domain/usecases/auth/forget_password";
import { AuthService } from "@data/services/auth.service";
import { ForgotPasswordDto } from "@data/dtos/auth/forgot_password.dto";

jest.mock('@data/services/auth.service', () => {
    return {
        AuthService: jest.fn().mockImplementation(() => ({
            resetPassword: jest.fn(),
            user: {
                findFirst: jest.fn(),
                update: jest.fn(),
            },
        })),
    };
});

describe('AuthForgetPasswordUseCase', () => {
    let authForgetPasswordUseCase: AuthForgetPasswordUseCase;
    let mockedAuthService: any;

    beforeEach(() => {
        const authServiceInstance = new AuthService() as any;
        mockedAuthService = authServiceInstance;
        authForgetPasswordUseCase = new AuthForgetPasswordUseCase();
        authForgetPasswordUseCase.auth = authServiceInstance;
    });

    it('should reset password if user exists', async () => {
        // Arrange
        const userData: ForgotPasswordDto = {
            email: 'test@example.com',
            password: 'newPassword1234',
        };
    
        const mockUser = {
            id: 123,
            email: 'test@example.com',
        };
    
        // Mocking user existence and password update
        mockedAuthService.user.findFirst.mockResolvedValue(mockUser);
        mockedAuthService.user.update.mockResolvedValue('Password Updated');
    
        // Act
        const result = await authForgetPasswordUseCase.call(userData);
    
        // Assert
        expect(result.data).toBe('Password Updated');
        expect(result.error).toBeFalsy();
    });
    

    // Additional test cases for other scenarios can be added here
});
