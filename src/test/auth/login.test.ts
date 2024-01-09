import 'reflect-metadata';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { AuthController } from '@infrastructure/controllers/auth.controller';

describe('AuthController', () => {
  let loginController: AuthController;

  beforeEach(() => {
    loginController = new AuthController();
  });

  it('should authenticate a user and return a token on successful login', async () => {
    const req: Partial<Request> = {
      login: jest.fn(), // Mock the login method
    } as Partial<Request>;
  
    const res: Partial<Response> = {
      send: jest.fn(),
    };
  
    jest.spyOn(passport, 'authenticate').mockImplementation((_strategy: string, _options: any, callback: Function) => {
      const user = { id: 1, username: 'testUser' };
      callback(null, user);
      return (_req: Request, _res: Response) => {
        _res.send({ token: 'fakeToken' });
      };
    });
  
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'fakeToken' as string | undefined);

  
    await loginController.login(req as Request, res as Response);
  
    expect(req.login).toHaveBeenCalledWith(expect.objectContaining(req.user), expect.any(Function));
    expect(res.send).toHaveBeenCalledWith({ token: 'fakeToken' });
  });
  

  // Add more test cases for error scenarios, invalid credentials, etc.
});
