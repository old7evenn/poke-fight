import { BaseResponse } from '@/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Pokemon } from './entities';
import { PaginationResponse } from '@/shared/pagination';

export class PaginationPokemonsResponse extends PaginationResponse {
  @ApiProperty({ description: 'Pokemons', type: [Pokemon] })
  pokemons: Pokemon[];
}

export class PokemonsResponse extends BaseResponse {
  @ApiProperty({
    description: 'Pokemons with pagination',
    type: PaginationPokemonsResponse,
  })
  response: PaginationPokemonsResponse;
}

export class PokemonResponse extends BaseResponse {
  @ApiProperty({ description: 'Pokemon', type: Pokemon })
  pokemon: Pokemon;
}
