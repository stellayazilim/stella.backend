import { Module } from '@nestjs/common';
import { MongooseModule } from './modules/mongoose/mongoose.module';
import { AdministratorModule } from './modules/administrator/administrator.module';

@Module({
  imports: [MongooseModule, AdministratorModule],
})
export class AppModule {}
