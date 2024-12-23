import { PokemonControllerGetPokemonsParams, StatisticsResponse } from '@/generated/api';
import { pokeApi } from '@/utils/api/instance';

export type GetPokemonsStatRequestConfig = RequestConfig<PokemonControllerGetPokemonsParams>;

export const getStatistics = ({ config, params }: GetPokemonsStatRequestConfig) =>
  pokeApi.get<StatisticsResponse>(`statistic/pokemons`, { params, ...config });
