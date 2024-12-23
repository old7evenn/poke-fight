import type { PokemonControllerGetPokemonsParams, PokemonsResponse } from '@/generated/api';

import { pokeApi } from '@/utils/api/instance';

export type GetPokemonsRequestConfig = RequestConfig<PokemonControllerGetPokemonsParams>;

export const getPokemons = ({ config, params }: GetPokemonsRequestConfig) =>
  pokeApi.get<PokemonsResponse>('pokemon', { params, ...config });
