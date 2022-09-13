import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalsService } from './terminals.service';
import { TerminalsController } from './terminals.controller';
//import Terminals from 'src/db/models/Terminals.entity';
import Perfiles from 'src/db/models/perfiles.entity';

@Module({
  imports: [],
  controllers: [TerminalsController],
  providers: [TerminalsService],
  exports: [TerminalsService],
})
export class TerminalsModule {}
