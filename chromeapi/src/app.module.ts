import { Module } from '@nestjs/common';
import { AccountModule } from './app/account/account.module';
import { TokenModule } from './app/token/token.module';
import { UserModule } from './app/user/user.module';
import {
  AccountEntity,
  TokenEntity,
  UserEntity,
} from './core/lib/database/entities';
import {
  AccountRepository,
  TokenRepository,
  UserRepository,
} from './core/lib/database/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';

const entities = [AccountEntity, TokenEntity, UserEntity];

const repositories = [AccountRepository, TokenRepository, UserRepository];

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [AccountEntity, TokenEntity, UserEntity],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([...entities]),
    AccountModule,
    TokenModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [...repositories],
})
export class AppModule {}
