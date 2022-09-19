import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Abonos from '../db/models/abono.entity';
import { AbonoService } from './abono.service';

@Module({
  imports: [TypeOrmModule.forFeature([Abonos])],
  providers: [AbonoService],
  exports: [AbonoService],
})
export class AbonoModule {}
