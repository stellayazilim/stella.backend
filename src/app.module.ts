import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule } from '@nestjs/config';
import { TestController } from './test.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development.local',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/stella'),
    UserModule,
    TenantModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [TestController],
})
export class AppModule {}
