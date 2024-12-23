import { Pokemon } from '@/modules/pokemon/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Statistic } from './statistic.entity';

@Entity('pokemon_statistic')
export class PokemonStatistic extends Pokemon {
  @ApiProperty({ description: 'Pokemon Statistic' })
  statistic: Statistic;
}
