import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export default class Bancos {
  @PrimaryGeneratedColumn()
  banCodBan?: string;

  @Column()
  banDescBan!: string;

  @Column()
  banSwift!: string;
}
