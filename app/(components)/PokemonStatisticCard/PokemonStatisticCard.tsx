import type { Pokemon, Statistic } from "@/utils/database/schema";
import type { PokemonType } from "@/utils/helpers";
import { getPokemonBackground } from "@/utils/helpers";

import {
  PokemonCard,
  PokemonCardBackground,
  PokemonCardImage,
} from "../PokemonCard/PokemonCard";

type PokemonStatisticCardProps = {
  statistic: Required<Statistic>;
  pokemon: Required<Pokemon>;
  total: number;
};

export const PokemonStatisticCard = ({
  statistic,
  pokemon,
  total,
}: PokemonStatisticCardProps) => (
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
      <PokemonCardBackground
        src={`backgrounds/bg-${getPokemonBackground(pokemon?.types[0] as PokemonType)}.png`}
      />
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
);
