import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export default class Abonos {
  @PrimaryGeneratedColumn()
  aboCod?: number;

  @Column()
  aboTerminal!: string;

  @Column()
  aboCodAfi!: string;

  @Column()
  aboCodComercio!: number;

  @Column()
  aboCodBanco!: string;

  @Column()
  aboNroCuenta!: string;

  @Column()
  aboTipoCuenta!: string;

  @Column({ nullable: true, default: null })
  aboFreg?: string;

  @Column()
  estatusId!: number;

  @Column({ default: 0 })
  pagoContado?: number;

  @Column({ default: 'NOW()' })
  fechaPago?: Date;

  @Column({ nullable: true, default: null })
  montoEquipoUSD?: number;

  @Column({ nullable: true, default: null })
  ivaEquipoBs?: number;

  @Column({ nullable: true, default: null })
  montoTotalEquipoBs?: number;
}
