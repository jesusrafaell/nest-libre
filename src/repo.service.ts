import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Usuarios from './db/models/usuarios.entity';

@Injectable()
class RepoService {
  bookRepo: any;
  public constructor(
    @InjectRepository(Usuarios)
    public readonly user: Repository<Usuarios>,
  ) {}
}

export default RepoService;
