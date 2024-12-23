import { memo, useMemo } from 'react';

import type { Pokemon, Statistic } from '@/generated/api';

import {
  PokemonCard,
  PokemonCardBackground,
  PokemonCardImage,
  pokemonTypesVariants,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { getPokemonBackground } from '@/utils/helpers';

interface PokemonStatisticContentProps {
  pokemon: Pokemon;
  statistic: Statistic;
}

export const PokemonStatisticContent = memo(
  ({ statistic, pokemon }: PokemonStatisticContentProps) => {
    const total = statistic.pass + statistic.smash;

    const pokemonBackground = useMemo(() => getPokemonBackground(pokemon.types[0]), [pokemon.id]);

    return (
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          What Others Chose for{' '}
          <span className={cn(pokemonTypesVariants({ type: pokemon.types[0] }))}>
            {pokemon.name}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <div className="flex w-full flex-col items-end">
            <p>Passes</p>
            <div
              className="h-6 rounded-md bg-red-300 transition-all duration-300 ease-in"
              style={{ width: `${(statistic.pass / total) * 100}%` }}
            />
            <p>{statistic.pass}</p>
          </div>
          <PokemonCard className="h-[95px] w-full" pokemon={pokemon}>
            <PokemonCardBackground src={`backgrounds/bg-${pokemonBackground}.png`} />
            <PokemonCardImage className="min-h-26 min-w-26" />
          </PokemonCard>
          <div className="flex w-full flex-col items-start">
            <p>Smashes</p>
            <div
              className="h-6 rounded-md bg-green-300 transition-all duration-300 ease-in"
              style={{ width: `${(statistic.smash / total) * 100}%` }}
            />
            <p>{statistic.smash}</p>
          </div>
        </div>
      </div>
    );
  }
);
