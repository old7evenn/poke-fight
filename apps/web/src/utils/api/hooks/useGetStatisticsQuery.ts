import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';

import type { GetPokemonsRequestConfig } from '../requests';

import { getStatistics } from '../requests';
import { PokemonsResponse } from '@/generated/api';

interface GetPokemonsResponse {
  pageParams: number[];
  pages: [PokemonsResponse];
}

export const useGetSatisticsInfiniteQuery = (
  { params }: GetPokemonsRequestConfig,
  settings?: InfiniteQuerySettings<typeof getStatistics>
): UseInfiniteQueryResult<GetPokemonsResponse> =>
  useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['getPokemonsPagination', params.limit],
    queryFn: ({ pageParam }) =>
      getStatistics({
        params: { ...params, offset: (pageParam as number) * params.limit! },
        config: settings?.config,
      }),
    getNextPageParam: lastPage => {
      if (lastPage && lastPage.response.next) {
        return lastPage.response.page;
      }
      return undefined;
    },
    ...settings?.options,
  });
