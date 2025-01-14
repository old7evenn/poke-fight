import { useQuery } from '@tanstack/react-query';

import type { GetStatisticParams } from '../requests';

import { getStatisticPokemon } from '../requests';

export const useGetStatisticQuery = (
  params: GetStatisticParams,
  settings: QuerySettings<typeof getStatisticPokemon>
) =>
  useQuery({
    queryKey: ['statistic', params.pokemonId],
    queryFn: () => getStatisticPokemon({ params: params, ...settings.config }),
    ...settings?.options,
  });
