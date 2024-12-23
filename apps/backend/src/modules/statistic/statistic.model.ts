import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, PaginationResponse } from '@/shared';
import { PokemonStatistic, Statistic } from './entities';

export class StatisticResponse extends BaseResponse {
  @ApiProperty({ description: 'Pokemon statistics', type: Statistic })
  statistic: Statistic;
}

export class PaginationPokemonsStatisticResponse extends PaginationResponse {
  @ApiProperty({ description: 'Pokemon statistics', type: [PokemonStatistic] })
  pokemons: PokemonStatistic[];
}

export class PokemonStatisticResponse extends BaseResponse {
  @ApiProperty({ description: 'Pokemon statistics', type: PaginationPokemonsStatisticResponse })
  response: PaginationPokemonsStatisticResponse;
}
