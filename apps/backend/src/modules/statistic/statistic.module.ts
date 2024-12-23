import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities';
import { PokemonService } from '../pokemon';
import { Pokemon } from '../pokemon/entities';

@Module({
  controllers: [StatisticController],
  imports: [TypeOrmModule.forFeature([Statistic, Pokemon])],
  exports: [TypeOrmModule],
  providers: [StatisticService, PokemonService],
})
export class StatisticModule {}
