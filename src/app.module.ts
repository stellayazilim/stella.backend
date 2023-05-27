import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule } from '@nestjs/config';
import { TestController } from './test.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/stella'),
    UserModule,
    TenantModule,
    RoleModule,
  ],
  controllers: [TestController],
})
export class AppModule {}
