import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { MockUserModel } from '../__mocks__/user.model';
import { User, UserDocument } from 'src/schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FlattenMaps, Types } from 'mongoose';
import { UnauthorizedException } from '@nestjs/common';
import { Role } from 'src/schemas/role.schema';

describe('Auth Service', () => {
  jest.clearAllMocks();
  let authService: AuthService;

  const mockUserModel = MockUserModel;
  const mockUserId = new Types.ObjectId();

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [
        JwtModule.register({}),
        ConfigModule.forRoot({ envFilePath: '.env.development.local' }),
      ],
      providers: [
        ConfigService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        AuthService,
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
  });

  it('should defined', () => {
    expect(authService).toBeDefined();
  });

  describe('LoginByCredentials', () => {
    it('should generate tokens', async () => {
      mockUserModel.findOne.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue({
          _id: mockUserId,
          email: 'j@doe.com',
          // 1234
          password:
            'f953be9c339e9ca849698411ced7a29abfb9b563b069138dfbd3ca041cbac6490f033381e57b99dca75acf548cdab80f082fab221cab4439b507f6f922cb3612',
          role: new Role(),
        } as unknown as FlattenMaps<User>),
      });

      const result = authService.LoginByCredentials('j@doe.com', '1234');

      expect(mockUserModel.findOne).toBeCalledWith({ email: 'j@doe.com' });
      expect(result).resolves.toMatchObject({
        _id: mockUserId,
        email: 'j@doe.com',
        role: new Role(),
      });
    });

    it('should throw UnauthorizedException if user not found', () => {
      mockUserModel.findOne.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue({
          _id: mockUserId,
          email: 'j@doe.com',
          // 1234
          password:
            'f953be9c339e9ca849698411ced7a29abfb9b563b069138dfbd3ca041cbac6490f033381e57b99dca75acf548cdab80f082fab221cab4439b507f6f922cb3612',
          role: new Role(),
        } as unknown as FlattenMaps<User>),
      });

      const result = authService.LoginByCredentials('j@doe.com', '12345');

      expect(result).rejects.toThrowError(new UnauthorizedException());
    });

    it('should throw UnauthorizedException if passwords do not match', () => {
      mockUserModel.findOne.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(null),
      });

      const result = authService.LoginByCredentials('j@doe.com', '1234');

      expect(result).rejects.toThrowError(new UnauthorizedException());
    });
  });

  describe('Sign Tokens', () => {
    const mockUser: Partial<FlattenMaps<UserDocument>> = {
      _id: mockUserId,
      email: 'j@doe.com',
      role: new Role(),
    };
    it('should sign tokens', () => {
      const tokens = authService.SignTokens(mockUser);

      expect(tokens).resolves.toHaveProperty('accessToken');
      expect(tokens).resolves.toHaveProperty('refreshToken');
    });
  });

  describe('Refresh Tokens', () => {
    beforeEach(() => {
      mockUserModel.findOne.mockClear();
    });
    it('should sign tokens with refresh token', async () => {
      const expectedUser = {
        _id: mockUserId,
        email: 'j@doe.com',
        role: new Role(),
      } as unknown as FlattenMaps<User>;

      mockUserModel.findOne.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(expectedUser),
      });

      const result = await authService.RefreshTokens({
        sub: 'j@doe.com',
        _id: mockUserId,
      } as Express.User);

      expect(mockUserModel.findOne).toBeCalledWith({
        _id: mockUserId,
        email: 'j@doe.com',
      });
      expect(result).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        }),
      );
    });
  });
});
