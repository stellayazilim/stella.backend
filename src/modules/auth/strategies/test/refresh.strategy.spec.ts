import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { JwtRefreshStrategy } from '../refresh.stragy';
import { ConfigModule } from '@nestjs/config';

describe('Refresh Strategy', () => {
  let jwtRefreshStrategy: JwtRefreshStrategy;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.development.local',
        }),
      ],
      providers: [JwtRefreshStrategy],
    }).compile();

    jwtRefreshStrategy = app.get<JwtRefreshStrategy>(JwtRefreshStrategy);
  });

  it('should be defined', () => {
    expect(JwtRefreshStrategy).toBeDefined();
  });

  it('should exclude iat, exp properties', () => {
    const mockUserId = new Types.ObjectId();
    const user = jwtRefreshStrategy.validate(<
      Express.User & { iat: number; exp: number }
    >{
      _id: mockUserId,
      sub: 'j@doe.com',
      iat: 12345,
      exp: 12345,
    });

    expect(user).resolves.toMatchObject({
      _id: mockUserId,
      sub: 'j@doe.com',
    });
  });
});
