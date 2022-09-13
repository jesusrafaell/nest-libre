import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ComisionesMilPagos', { synchronize: false })
export default class ComisionesMilPagos {
	@PrimaryGeneratedColumn()
	cmCodComercio!: number;

	@Column({ nullable: true })
	cmPorcentaje!: number;
}
