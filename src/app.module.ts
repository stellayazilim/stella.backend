import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from './modules/mongoose/mongoose.module';
import { TenantModule } from './modules/tenant/tenant.module';

@Module({
  imports: [MongooseModule, TenantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
