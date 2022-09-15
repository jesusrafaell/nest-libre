import { Module } from '@nestjs/common';
import { TerminalsService } from './terminals.service';
import { TerminalsController } from './terminals.controller';
import { CommerceModule } from 'src/commerce/commerce.module';
import { AbonoModule } from 'src/abono/abono.module';
//import Terminals from 'src/db/models/Terminals.entity';

@Module({
  imports: [CommerceModule, AbonoModule],
  controllers: [TerminalsController],
  providers: [TerminalsService],
  exports: [TerminalsService],
})
export class TerminalsModule {}
