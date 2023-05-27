import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchemaFactory } from 'src/schemas/stella/factory/role.schema.factory';

@Module({
  imports: [MongooseModule.forFeatureAsync([RoleSchemaFactory])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
