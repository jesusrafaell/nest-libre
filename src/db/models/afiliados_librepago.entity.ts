import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Afiliados from './afiliados.entity';

@Entity('Afiliados_LibrePago')
export default class AfiliadosLibrePago {
  @PrimaryGeneratedColumn()
  id?: string;

  @OneToOne(() => Afiliados)
  @JoinColumn({ name: 'id_afiliado' })
  id_afiliado: number;
}
