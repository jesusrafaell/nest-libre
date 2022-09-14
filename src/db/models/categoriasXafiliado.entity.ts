import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CategoriasXafiliado', { synchronize: false })
export default class CategoriasXafiliado {
  @PrimaryGeneratedColumn()
  catCodAfi!: string;

  @PrimaryGeneratedColumn()
  catCodCat!: string;
}
