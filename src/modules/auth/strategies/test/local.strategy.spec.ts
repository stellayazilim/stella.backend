import { Test } from '@nestjs/testing';
import { LocalStrategy } from '../local.strategy';
import { MockAuthService } from '../../__mocks__/auth.service';
import { AuthService } from '../../auth.service';
import { Types } from 'mongoose';
import { Role } from 'src/schemas/role.schema';
import { BadRequestException } from '@nestjs/common';

describe('Local Strategy', () => {
  const mockAuthService = MockAuthService;
  let localStrategy: LocalStrategy;
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    localStrategy = app.get<LocalStrategy>(LocalStrategy);
  });
  it('should defined', () => {
    expect(localStrategy).toBeDefined();
  });

  it('should parse token', async () => {
    const mockUserId = new Types.ObjectId();
    mockAuthService.LoginByCredentials.mockResolvedValue({
      _id: mockUserId,
      email: 'j@doe.com',
      role: new Role(),
    });
    const user = localStrategy.validate('stella@stella.co', 'stella');

    expect(user).resolves.toMatchObject({
      _id: mockUserId,
      email: 'j@doe.com',
      role: new Role(),
    });
  });

  it("should throw error if email or password doesn't present", () => {
    const user = localStrategy.validate('stella@stella.co', undefined);
    expect(user).rejects.toThrowError(new BadRequestException());
  });
});
