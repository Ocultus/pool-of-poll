import { Module } from '@nestjs/common';
import { PollService } from './poll.service';

@Module({
  providers: [PollService]
})
export class PollModule {}
