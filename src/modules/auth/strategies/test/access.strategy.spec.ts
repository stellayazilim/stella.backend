import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { JwtAccessStrategy } from '../access.stragy';
import { ConfigModule } from '@nestjs/config';

describe('Jwt Access Strategy', () => {
  let jwtAccessStrategy: JwtAccessStrategy;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.development.local',
        }),
      ],
      providers: [JwtAccessStrategy],
    }).compile();

    jwtAccessStrategy = app.get<JwtAccessStrategy>(JwtAccessStrategy);
  });

  it('should be defined', () => {
    expect(jwtAccessStrategy).toBeDefined();
  });

  it('should exclude iat, exp properties', () => {
    const mockUserId = new Types.ObjectId();
    const user = jwtAccessStrategy.validate(<
      Express.User & { iat: number; exp: number }
    >{
      _id: mockUserId,
      sub: 'j@doe.com',
      email: 'j@doe.com',
      role: null,
      iat: 12345,
      exp: 12345,
    });

    expect(user).resolves.toMatchObject({
      _id: mockUserId,
      sub: 'j@doe.com',
      email: 'j@doe.com',
      role: null,
    });
  });
});
