import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'private_key',
    length: 255,
    nullable: false,
  })
  privateKey: string;

  @Column({
    type: 'varchar',
    name: 'address',
    length: 255,
    nullable: false,
  })
  address: string;
}
