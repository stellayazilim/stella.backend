import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth.module';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserModel } from 'src/schemas/user.schema';
import { AuthService } from '../auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtAccessStrategy } from '../strategies/access.stragy';
import { JwtRefreshStrategy } from '../strategies/refresh.stragy';
import { AuthController } from '../auth.controller';
import { Role, RoleModel } from 'src/schemas/role.schema';
import { JwtService } from '@nestjs/jwt';

describe('Auth Module ', () => {
  let authModule: AuthModule;
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.development.local',
        }),
        AuthModule,
      ],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue({})
      .overrideProvider(getModelToken(Role.name))
      .useValue({})
      .compile();

    authModule = app.get<AuthModule>(AuthModule);
  });

  it('should defined', () => {
    expect(authModule).toBeDefined();
  });
});
