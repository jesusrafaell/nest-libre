import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import Afiliados from './afiliados.entity';

@Entity('Afiliados_LibrePago')
export default class AfiliadosLibrePago {
  @PrimaryGeneratedColumn()
  id?: string;

  @OneToOne(() => Afiliados)
  @JoinColumn({ name: 'afiliado' })
  afiliado: string;
}
