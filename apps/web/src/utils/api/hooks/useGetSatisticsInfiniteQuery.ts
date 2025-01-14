// @ts-nocheck

import { useInfiniteQuery } from '@tanstack/react-query';

import { getStatistics, GetStatisticsParams } from '../requests';

export const useGetSatisticsInfiniteQuery = (
  params: GetStatisticsParams,
  settings?: InfiniteQuerySettings<typeof getStatistics>
) =>
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
