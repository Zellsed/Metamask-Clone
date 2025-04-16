import { IsOptional, IsString } from 'class-validator';

export class AccountDto {
  @IsOptional()
  @IsString()
  privateKey: string;

  @IsOptional()
  @IsString()
  address: string;
}
