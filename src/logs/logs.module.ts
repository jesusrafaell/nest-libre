import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import general_logs_librepago from '../db/models/general_logs_librepago.entity';
import origin_logs_librepago from '../db/models/origin_logs_librepago.entity';
import { LogsService } from './logs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([origin_logs_librepago, general_logs_librepago]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
