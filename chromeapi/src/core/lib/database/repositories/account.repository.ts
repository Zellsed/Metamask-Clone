import { EntityRepository, Repository } from 'typeorm';
import { AccountEntity } from '../entities';

@EntityRepository(AccountEntity)
export class AccountRepository extends Repository<AccountEntity> {}
