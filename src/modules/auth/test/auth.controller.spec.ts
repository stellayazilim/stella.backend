import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { MockAuthService } from '../__mocks__/auth.service';
import { Types } from 'mongoose';
import { Role } from 'src/schemas/role.schema';
import type { Request } from 'express';
describe('Auth Controller', () => {
  let authController: AuthController;
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: MockAuthService,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  it('should defined', () => {
    expect(authController).toBeDefined();
  });

  describe('sigin in', () => {
    const mockResolvedTokens = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqQGRvZS5jb20iLCJfaWQiOiI2NDc1MmQ2YzBlMTBiMWM0NWE2ODc4MzEiLCJyb2xlIjpudWxsLCJpYXQiOjE2ODU0ODY4MDAsImV4cCI6MTY4NTQ4NzcwMH0.kVlbxb15N1oGpeq-Zo0OP9B64OVhRqJNdXEUXSi7w8k',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqQGRvZS5jb20iLCJfaWQiOiI2NDc1MmQ2YzBlMTBiMWM0NWE2ODc4MzEiLCJpYXQiOjE2ODU0ODY4MDAsImV4cCI6MTY4Njc4MjgwMH0.GyJ5Jfa4N4o05k-eMRV-X2XUMo-ax1qNu7a4NNcn-Kk',
    };
    const mockUserId = new Types.ObjectId();
    const mockRequest: Express.Request = {
      user: {
        _id: mockUserId,
        email: 'j@doe.com',
        role: new Role(),
      } as Express.User,
    } as Express.Request;
    it('should return tokens', async () => {
      MockAuthService.SignTokens.mockResolvedValue(mockResolvedTokens);
      const tokens = authController.signIn(mockRequest as unknown as Request);

      expect(MockAuthService.SignTokens).toHaveBeenCalledWith(mockRequest.user);
      expect(tokens).resolves.toMatchObject(mockResolvedTokens);
    });
  });

  describe('Refresh tokens', () => {
    const mockResolvedTokens = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqQGRvZS5jb20iLCJfaWQiOiI2NDc1MmQ2YzBlMTBiMWM0NWE2ODc4MzEiLCJyb2xlIjpudWxsLCJpYXQiOjE2ODU0ODY4MDAsImV4cCI6MTY4NTQ4NzcwMH0.kVlbxb15N1oGpeq-Zo0OP9B64OVhRqJNdXEUXSi7w8k',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqQGRvZS5jb20iLCJfaWQiOiI2NDc1MmQ2YzBlMTBiMWM0NWE2ODc4MzEiLCJpYXQiOjE2ODU0ODY4MDAsImV4cCI6MTY4Njc4MjgwMH0.GyJ5Jfa4N4o05k-eMRV-X2XUMo-ax1qNu7a4NNcn-Kk',
    };
    const mockUserId = new Types.ObjectId();
    const mockRequest: Express.Request = {
      user: {
        _id: mockUserId,
        email: 'j@doe.com',
      } as Express.User,
    } as Express.Request;

    it('should refresh tokens', () => {
      MockAuthService.RefreshTokens.mockReturnValue(mockResolvedTokens);
      const tokens = authController.refresh(mockRequest as unknown as Request);
      expect(MockAuthService.RefreshTokens).toHaveBeenCalledWith(
        mockRequest.user,
      );

      expect(tokens).resolves.toMatchObject(mockResolvedTokens);
    });
  });
});
