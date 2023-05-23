import { Module } from '@nestjs/common';
import { MongooseModule } from './modules/mongoose/mongoose.module';
import { TenantModule } from './modules/stella/tenant/tenant.module';
import { AuthModule } from './modules/stella/auth/auth.module';

@Module({
  imports: [MongooseModule, TenantModule, AuthModule],
})
export class AppModule {}
