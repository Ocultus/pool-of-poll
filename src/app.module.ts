import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  {connectionOptions} from './config/config';
import { Answer } from './answer/entity/answer.entity';
import { Poll } from './poll/entity/poll.entity';
import { User } from './user/user/user.entity';
import { PollModule } from './poll/poll.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        ...connectionOptions, autoLoadEntities: true,
        entities: [User,Poll,Answer]
      }),
      PollModule,
      AuthModule,
      UserModule,
      AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
