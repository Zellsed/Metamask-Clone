import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/core/lib/database/entities';
import { AccountRepository } from 'src/core/lib/database/repositories';
import { AccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: AccountRepository,
  ) {}

  async craeteAccount(accountData: AccountDto) {
    const account = await this.accountRepository.create(accountData);

    return await this.accountRepository.save(account);
  }

  async getAllAccount() {
    return await this.accountRepository.find();
  }
}
