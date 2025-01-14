import { keepPreviousData } from '@tanstack/react-query';

import { LOCAL_STORAGE_KEYS } from '@/utils';
import { useGetPokemonQuery } from '@/utils/api/hooks';
import { useGetStatisticQuery } from '@/utils/api/hooks';

const REFETCH_STATS_TIME = 5000;

export const usePokemonStatistic = () => {
  const prevPokemonIdStorage = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.PREV_POKEMON_ID));

  const getPokemonQuery = useGetPokemonQuery(
    { pokemonId: prevPokemonIdStorage! },
    { options: { enabled: !!prevPokemonIdStorage } }
  );

  const getStatisticPokemonQuery = useGetStatisticQuery(
    {
      pokemonId: prevPokemonIdStorage,
    },
    {
      options: {
        placeholderData: keepPreviousData,
        refetchInterval: REFETCH_STATS_TIME,
        enabled: !!prevPokemonIdStorage,
      },
    }
  );

  return {
    state: {
      statistic: getStatisticPokemonQuery.data?.statistic,
      pokemon: getPokemonQuery.data?.pokemon,
      loading: getStatisticPokemonQuery.isLoading || getPokemonQuery.isLoading,
    },
  };
};
