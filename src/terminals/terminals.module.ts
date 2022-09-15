import { Module } from '@nestjs/common';
import { TerminalsService } from './terminals.service';
import { TerminalsController } from './terminals.controller';
import { AbonoModule } from 'src/abono/abono.module';
import { CommerceModule } from 'src/commerce/commerce.module';

@Module({
  imports: [CommerceModule, AbonoModule],
  controllers: [TerminalsController],
  providers: [TerminalsService],
  exports: [TerminalsService],
})
export class TerminalsModule {}
