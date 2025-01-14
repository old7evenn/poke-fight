import { createLazyFileRoute } from '@tanstack/react-router';
import { useStatisticPage } from './-hooks/useStatisticPage';
import { Card, PokemonCardType } from '@/components/ui';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatNumber } from '@/utils/helpers/pokemon/formatNumber';
import { SkeletonCard } from './-components/StatisticSkeleton/StatisticSkeleton';
import { forwardRef, memo, useMemo } from 'react';
import { PokemonStatistic } from '@/generatedapi';

const PokemonCard = memo(forwardRef<HTMLLIElement, { pokemon: PokemonStatistic; index: number }>(
    ({ pokemon, index }, ref) => {  
  const smashPercentage = useMemo(
    () =>
      Math.round(
        (pokemon.statistic.smash / (pokemon.statistic.pass + pokemon.statistic.smash)) * 100
      ),
    [pokemon.statistic]
  );

  const passPercentage = useMemo(
    () =>
      Math.round(
        (pokemon.statistic.pass / (pokemon.statistic.pass + pokemon.statistic.smash)) * 100
      ),
    [pokemon.statistic]
  );

  return (
    <motion.li 
      ref={ref}
      layout
      key={pokemon.pokemonId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: (index % 10) * 0.1, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }}
      className="max-w-[400px] mx-auto"
    >
      <Card className="w-full grid grid-cols-12 gap-4 py-4 px-4 items-center">
        <div className="col-span-2 text-center">
          <p className="text-xl font-extralight capitalize text-gray-600">
            #{formatNumber(pokemon.statistic.smash + pokemon.statistic.pass)}
          </p>
        </div>

        <div className="col-span-2 flex justify-start gap-4 items-center">
          <img alt={pokemon.name} className="size-12 object-contain" src={pokemon.image} />
          <div className="flex flex-col gap-1 items-start">
            <div className="flex gap-1">
              {pokemon.types.map(type => (
                <PokemonCardType key={type}>{type}</PokemonCardType>
              ))}
            </div>
            <span className="font-medium capitalize truncate">{pokemon.name}</span>
          </div>
        </div>

        <div className="col-span-3" />

        {pokemon.statistic && (
          <div className="col-span-5 flex gap-2 justify-center items-center">
            <div
              className={cn(
                pokemon.statistic.smash > pokemon.statistic.pass && 'font-semibold',
                'text-sm'
              )}
            >
              {smashPercentage}%
            </div>

            <div className="w-full flex gap-1 max-w-[250px]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    style={{
                      width: `${(pokemon.statistic.smash / (pokemon.statistic.pass + pokemon.statistic.smash)) * 100}%`,
                    }}
                  >
                    <div className="h-6 rounded-md bg-green-300 transition-all duration-300 ease-in" />
                  </TooltipTrigger>
                  <TooltipContent>smashes: {pokemon.statistic.smash}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    style={{
                      width: `${(pokemon.statistic.pass / (pokemon.statistic.pass + pokemon.statistic.smash)) * 100}%`,
                    }}
                  >
                    <div className="h-6 rounded-md bg-red-300 transition-all duration-300 ease-in" />
                  </TooltipTrigger>
                  <TooltipContent>passes: {pokemon.statistic.pass}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div
              className={cn(
                !(pokemon.statistic.smash > pokemon.statistic.pass) && 'font-semibold',
                'text-sm'
              )}
            >
              {passPercentage}%
            </div>
          </div>
        )}
      </Card>
    </motion.li>
  );
}));

const StatisticPage = () => {
  const { state, refs } = useStatisticPage();

  const skeletons = useMemo(() => 
    Array.from({ length: 10 }).map((_, index) => (
      <SkeletonCard key={`skeleton-${index}`} index={index}/>
    )),
    []
  );

  return (
    <main className="flex flex-col items-center md:p-4 p-2 h-full">
      <motion.ul className="w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 items-center">
        <AnimatePresence mode="popLayout">
          {state.pokemons?.map((pokemon, index) => (
            <PokemonCard key={pokemon.pokemonId} pokemon={pokemon} index={index}/>
          ))}
          {state.isLoading && skeletons}
        </AnimatePresence>
        <div ref={refs.view.ref}></div>
      </motion.ul>
    </main>
  );
};

export const Route = createLazyFileRoute('/_layout/statistic/')({
  component: StatisticPage,
});
