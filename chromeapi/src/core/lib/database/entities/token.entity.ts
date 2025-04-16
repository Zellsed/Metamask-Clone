import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('token')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'address',
    length: 255,
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    name: 'symbol',
    length: 255,
    nullable: false,
  })
  symbol: string;
}
