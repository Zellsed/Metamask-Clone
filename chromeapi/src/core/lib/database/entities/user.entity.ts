import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {
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
    name: 'email',
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 255,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    name: 'address',
    length: 255,
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    name: 'private_key',
    length: 255,
    nullable: true,
  })
  privateKey: string;

  @Column({
    type: 'varchar',
    name: 'mnemonic',
    length: 255,
    nullable: true,
  })
  mnemonic: string;

  @BeforeInsert()
  async hassPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async correctPassword(candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}
