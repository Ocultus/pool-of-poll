import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as connectionOptions from './config/config';
import { Answer } from './entity/answer.entity';
import { Poll } from './entity/poll.entity';
import { User } from './entity/user.entity';
import { PollModule } from './poll/poll.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        ...connectionOptions, autoLoadEntities: true,
        entities: [User,Poll,Answer]
      }),
      PollModule,
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
