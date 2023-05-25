import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaFactory } from 'src/schemas/stella/factory/user.schema.factory';

@Module({
  imports: [MongooseModule.forFeatureAsync([UserSchemaFactory])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
