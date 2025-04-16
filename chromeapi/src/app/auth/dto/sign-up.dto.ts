import { IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  passwordConfirm: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  privateKey: string;

  @IsOptional()
  @IsString()
  mnemonic: string;
}
