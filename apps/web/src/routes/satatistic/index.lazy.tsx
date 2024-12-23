import { createLazyFileRoute } from '@tanstack/react-router';
import { useStatisticPage } from './-hooks/useStatisticPage';
import { Spinner } from '@/components/ui';
import { PokemonStatisticContent } from '../-components/PokemonStatistic/components';
import { AnimatePresence, motion } from 'motion/react';

const StatisticPage = () => {
  const { state, refs } = useStatisticPage();

  return (
    <main className="flex flex-col items-center p-4 h-full">
      <motion.ul className="flex flex-col gap-44 items-center">
        <AnimatePresence mode="popLayout">
          {state.pages.map(pokemon => (
            <motion.li
              layout
              key={pokemon.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              className="w-[300px]"
            >
              <PokemonStatisticContent pokemon={pokemon} statistic={pokemon.statistic} />
            </motion.li>
          ))}
        </AnimatePresence>
        {state.isFetching && <Spinner className="stroke-gray-300 size-12" />}
        <div ref={refs.view.ref}></div>
      </motion.ul>
    </main>
  );
};

export const Route = createLazyFileRoute('/satatistic/')({
  component: StatisticPage,
});
