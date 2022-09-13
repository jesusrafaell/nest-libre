import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ synchronize: false })
export default class Perfiles {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  nombre!: string;

  @Column({ nullable: false })
  opciones!: string;

  @Column({ nullable: false })
  estatus!: number;
}
