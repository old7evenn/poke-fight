import type { PokemonResponse } from '@/generated/api';

import { pokeApi } from '@/utils/api/instance';

export interface GetPokemonParams {
  pokemonId: number | string;
}

export type GetPokemonRequestConfig = RequestConfig<GetPokemonParams>;

export const getPokemon = ({ config, params }: GetPokemonRequestConfig) =>
  pokeApi.get<PokemonResponse>(`pokemon/${params.pokemonId}`, config);
