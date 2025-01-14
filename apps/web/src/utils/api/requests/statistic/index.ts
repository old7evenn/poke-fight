import { PokemonStatisticResponse, StatisticControllerGetSatisticsParams } from '@/generated/api';
import { pokeApi } from '@/utils/api/instance';

export type GetStatisticsParams = StatisticControllerGetSatisticsParams;

export type GetPokemonsStatRequestConfig = RequestConfig<GetStatisticsParams>;

export const getStatistics = ({ config, params }: GetPokemonsStatRequestConfig) =>
  pokeApi.get<PokemonStatisticResponse>(`statistic/pokemons`, { params, ...config });
