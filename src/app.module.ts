import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemporalModule } from './temporal/temporal.module';
import { SessionController } from './session/session.controller';

@Module({
  imports: [TemporalModule],
  controllers: [AppController, SessionController],
  providers: [AppService],
})
export class AppModule {}
