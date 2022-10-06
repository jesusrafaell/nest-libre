import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Usuarios from '../db/models/usuarios.entity';
import { TestResp } from './testApi.controller';

export interface Resp {
  message?: string;
  res?: Usuarios;
}

@Injectable()
export class TestApiService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly _usuarioRepository: Repository<Usuarios>,
  ) {}

  async getUser(): Promise<TestResp> {
    const user = await this._usuarioRepository.findOne({
      where: { login: 's_librepago' },
    });
    return {
      message: 'Todo ok',
      user,
    };
  }
}
