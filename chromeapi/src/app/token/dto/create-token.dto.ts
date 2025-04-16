import { IsOptional, IsString } from 'class-validator';

export class TokenDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  symbol: string;
}
