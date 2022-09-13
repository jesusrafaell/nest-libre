import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ComerciosXafiliado', { synchronize: false })
export default class ComerciosXafiliado {
  @PrimaryGeneratedColumn()
  cxaId!: number;

  @Column({ nullable: false })
  cxaCodAfi!: string;

  @Column({ nullable: false })
  cxaCodComer!: number;
}
