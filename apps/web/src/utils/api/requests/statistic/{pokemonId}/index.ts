import type { StatisticResponse } from '@/generated/api';

import { pokeApi } from '@/utils/api/instance';

export interface GetStatisticParams {
  pokemonId: number | string;
}

export type GetStatisticRequestConfig = RequestConfig<GetStatisticParams>;

export const getStatisticPokemon = ({ config, params }: GetStatisticRequestConfig) =>
  pokeApi.get<StatisticResponse>(`statistic/${params.pokemonId}`, config);
