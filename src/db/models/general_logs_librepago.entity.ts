import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import origin_logs_librepago from './origin_logs_librepago.entity';
import Usuarios from './usuarios.entity';

@Entity({ synchronize: true })
export default class general_logs_librepago {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Usuarios, (Usuarios) => Usuarios.general_logs)
  @JoinColumn({ name: 'id_user' })
  id_user!: number;

  @Column()
  descript!: string;

  @ManyToOne(
    () => origin_logs_librepago,
    (origin_logs) => origin_logs.general_logs,
  )
  @JoinColumn({ name: 'id_origin_logs' })
  id_origin_logs!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
