import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { UserEntity } from 'src/core/lib/database/entities';
import { UserRepository } from 'src/core/lib/database/repositories';
import { SignUpDto } from '../auth/dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: SignUpDto) {
    const user = await this.userRepository.create(data);

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
