import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchemaFactory } from 'src/schemas/stella/factory/tenant.schema.factory';

@Module({
  imports: [MongooseModule.forFeatureAsync([TenantSchemaFactory])],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
