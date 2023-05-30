import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchemaFactory } from 'src/schemas/factory/role.schema.factory';
import { JwtModule } from '@nestjs/jwt';
import { UserSchemaFactory } from 'src/schemas/factory/user.schema.factory';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './strategies/access.stragy';
import { JwtRefreshStrategy } from './strategies/refresh.stragy';
@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeatureAsync([RoleSchemaFactory, UserSchemaFactory]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
