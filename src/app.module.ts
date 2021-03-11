import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as connectionOptions from './config/config';
import { Answer } from './entity/answer.entity';
import { Poll } from './entity/poll.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        ...connectionOptions, autoLoadEntities: true,
        entities: [User,Poll,Answer]
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
