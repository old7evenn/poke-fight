import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './modules/pokemon';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticModule } from './modules/statistic';
import { PokemonService } from './modules/pokemon';
import * as dotenv from 'dotenv';
import { PokemonStatisticGateway } from './modules/statistic/pokemon-statistic.gateway';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    PokemonModule,
    StatisticModule,
  ],
  controllers: [],
  providers: [AppService, PokemonService],
})
export class AppModule {}
