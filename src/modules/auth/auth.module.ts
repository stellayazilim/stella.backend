import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchemaFactory } from 'src/schemas/stella/factory/role.schema.factory';
import { JwtModule } from '@nestjs/jwt';
import { UserSchemaFactory } from 'src/schemas/stella/factory/user.schema.factory';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeatureAsync([RoleSchemaFactory, UserSchemaFactory]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
