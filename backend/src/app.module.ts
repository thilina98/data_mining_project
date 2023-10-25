import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { PoemsModule } from './poems/poems.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SearchModule, PoemsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
