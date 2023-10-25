import { Module } from '@nestjs/common';
import { PoemsService } from './poems.service';
import { PoemsController } from './poems.controller';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [SearchModule],
  controllers: [PoemsController],
  providers: [PoemsService],
})
export class PoemsModule {}
