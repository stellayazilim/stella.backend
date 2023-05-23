import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchemaFactory } from 'src/schemas/stella/factory/role.schema.factory';
@Module({
  imports: [MongooseModule.forFeatureAsync([RoleSchemaFactory])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
