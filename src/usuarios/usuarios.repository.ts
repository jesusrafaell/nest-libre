import { EntityRepository, Repository } from 'typeorm';
import Usuarios from '../db/models/usuarios.entity';

@EntityRepository(Usuarios)
export class UsuariosRepository extends Repository<Usuarios> {}
