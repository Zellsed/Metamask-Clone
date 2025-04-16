import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenDto } from './dto/create-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('/create-token')
  async createToken(@Body() body: TokenDto) {
    return this.tokenService.createToken(body);
  }

  @Get('/all-token')
  async getAllToken() {
    return this.tokenService.findAll();
  }
}
