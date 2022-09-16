import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({ synchronize: false })
export default class Afiliados {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  afiCod?: string;

  @Column()
  afiDesc!: string;

  @Column()
  afiCodTipoPer!: number;

  @Column()
  afiFreg!: string;

  @Column()
  afiCodBan!: string;

  @Column()
  afiNroCuenta!: string;
}
