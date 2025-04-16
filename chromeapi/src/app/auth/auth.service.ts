import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly userService: UserService,
  ) {}

  async signUp(data: SignUpDto) {
    const existEmail = await this.userService.findByEmail(data.email);
    if (existEmail) {
      throw new Error('Email already exists');
    }

    if (data.password !== data.passwordConfirm) {
      throw new Error('Passwords do not match');
    }

    const user = await this.userService.create(data);

    const token = await this.signToken(user.id);

    user.password = undefined;

    return { user, token };
  }

  async login(data: LoginDto) {
    const existUser = await this.userService.findByEmail(data.email);

    if (!existUser) {
      throw new Error('Email not found');
    }

    const isPasswordCorrect = await existUser.correctPassword(data.password);

    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect');
    }

    const token = await this.signToken(existUser.id);

    existUser.password = undefined;

    return { user: existUser, token };
  }

  async signToken(id: number) {
    return this.jwtService.sign({ id });
  }
}
