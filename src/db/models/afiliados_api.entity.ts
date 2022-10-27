import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('afiliados_api')
export default class afiliado_api {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ unique: true })
  afiliado: string;
}
