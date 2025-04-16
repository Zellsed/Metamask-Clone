import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SignUpDto } from './dto/sign-up.dto';
import 'dotenv/config';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: SignUpDto,
  ) {
    const { token, user } = await this.authService.signUp(body);
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });
    return res
      .status(HttpStatus.CREATED)
      .json({ status: 'success', token, data: { user } });
  }

  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: LoginDto,
  ) {
    const { token, user } = await this.authService.login(body);

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    return res.status(HttpStatus.OK).json({
      status: 'success',
      token,
      data: { user },
    });
  }
}
