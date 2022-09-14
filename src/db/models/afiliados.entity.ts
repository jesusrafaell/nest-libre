import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export default class Afiliados {
	@PrimaryGeneratedColumn()
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
