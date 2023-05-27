import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/stella'),
    UserModule,
    TenantModule,
    RoleModule,
  ],
})
export class AppModule {}
