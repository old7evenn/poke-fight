import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities';
import { PokemonService } from '../pokemon';
import { Pokemon } from '../pokemon/entities';
import { PokemonStatisticGateway } from './pokemon-statistic.gateway';

@Module({
  controllers: [StatisticController],
  imports: [TypeOrmModule.forFeature([Statistic, Pokemon])],
  exports: [TypeOrmModule, PokemonStatisticGateway],
  providers: [StatisticService, PokemonService, PokemonStatisticGateway],
})
export class StatisticModule {}
