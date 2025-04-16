import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/create-account')
  async createAccount(@Body() body: AccountDto) {
    console.log('body', body);
    return await await this.accountService.craeteAccount(body);
  }

  @Get('/all-account')
  async getAllAccount() {
    return await this.accountService.getAllAccount();
  }
}
