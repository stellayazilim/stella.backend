import { Module } from '@nestjs/common';
import { MongooseModule as MModule } from '@nestjs/mongoose';
import { MongooseService } from './mongoose.service';
@Module({
  imports: [
    MModule.forRootAsync({
      useClass: MongooseService,
    }),
  ],
})
export class MongooseModule {}
