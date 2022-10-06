import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Log, LogHeader } from './dto/dto-logs.dto';
import general_logs_librepago from '../db/models/general_logs_librepago.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(general_logs_librepago)
    private readonly _general_logsRepository: Repository<general_logs_librepago>,
    private readonly jwtService: JwtService, //private usersService: UsersService,
  ) {}

  async saveLogsToken(log: LogHeader) {
    const { token: pre, method, path, msg } = log;
    const token = pre.replace('Bearer ', '');
    const { sub } = this.jwtService.decode(token);
    const dataLog: general_logs_librepago = {
      id_user: sub,
      descript: `[method:${method}]::[path:${path}]::[msg:${msg}]`,
      id_origin_logs: 1, //api librepago
    };
    try {
      await this._general_logsRepository.save(dataLog);
    } catch (err) {
      console.log({ msg: `Error en guardar en log`, log: dataLog });
    }
  }

  async saveLogs(log: Log) {
    const { id, method, path, msg } = log;
    const dataLog: general_logs_librepago = {
      id_user: id,
      descript: `[method:${method}]::[path:${path}]::[msg:${msg}]`,
      id_origin_logs: 1, //api librepago
    };
    try {
      await this._general_logsRepository.save(dataLog);
    } catch (err) {
      console.log({ msg: `Error en guardar en log`, log: dataLog });
    }
  }
}
