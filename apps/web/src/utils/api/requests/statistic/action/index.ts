import type { ActionPokemonDto, BaseResponse } from '@/generated/api';

import { pokeApi } from '@/utils/api/instance';

export type PostStatisticActionParams = ActionPokemonDto;

export type PostStatisticActionParamstConfig = RequestConfig<PostStatisticActionParams>;

export const postPokemonStatistic = ({ config, params }: PostStatisticActionParamstConfig) =>
  pokeApi.post<BaseResponse>(`statistic/action`, { ...config, ...params });
