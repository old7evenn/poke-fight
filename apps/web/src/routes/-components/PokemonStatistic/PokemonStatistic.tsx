import { PokemonStatisticContent, PokemonStatisticSkeleton } from './components';
import { usePokemonStatistic } from './hooks';

export const PokemonStatistic = () => {
  const { state } = usePokemonStatistic();

  return (
    <>
      {state.loading && <PokemonStatisticSkeleton />}
      {state.pokemon && state.statistic && !state.loading && (
        <PokemonStatisticContent statistic={state.statistic} pokemon={state.pokemon} />
      )}
    </>
  );
};
