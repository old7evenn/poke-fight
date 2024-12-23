import { getRouteApi } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useInView } from './useInView';
import { useGetSatisticsInfiniteQuery } from '@/utils/api/hooks';

const routeApi = getRouteApi('/satatistic/');

// const REFETCH_STATS_TIME = 5000;

export const useStatisticPage = () => {
  const { limit } = routeApi.useSearch();
  const { data, isFetching, isPending, fetchNextPage, hasNextPage } = useGetSatisticsInfiniteQuery({
    params: { limit }
  });

  const { ref, inView } = useInView({
    rootMargin: '0px 0px 0px 0px',
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return {
    refs: {
      view: {
        ref,
        inView,
      },
    },
    state: {
      pages: data?.pages ?? [],
      isPending,
      isFetching,
    },
  };
};
