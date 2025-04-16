import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import jwt from 'jsonwebtoken';
import { TokenEntity } from 'src/core/lib/database/entities';
import { TokenRepository } from 'src/core/lib/database/repositories';
import { TokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: TokenRepository,
  ) {}

  async createToken(tokenData: TokenDto) {
    const token = this.tokenRepository.create(tokenData);

    return this.tokenRepository.save(token);
  }

  async findAll() {
    return this.tokenRepository.find();
  }
}
