import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import general_logs_librepago from './general_logs_librepago.entity';

@Entity({ synchronize: true })
export default class origin_logs_librepago {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @OneToMany(
    () => general_logs_librepago,
    (general_logs) => general_logs.id_origin_logs,
  )
  @JoinColumn({ name: 'general_logs' })
  general_logs?: general_logs_librepago[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
