import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

import { COOKIES } from "@/utils/constants";
import { orm } from "@/utils/database/instance";
import { pokemonTable, statisticTable } from "@/utils/database/schema";
import type { PokemonType } from "@/utils/helpers";
import { getPokemonBackground, getRandomPokemonId } from "@/utils/helpers";

import {
  PokemonActions,
  PokemonCard,
  PokemonCardBackground,
  PokemonCardDescription,
  PokemonCardImage,
  PokemonCardTitle,
  PokemonCardTypes,
  PokemonContent,
  PokemonStatistic,
} from "./(components)";

const Home = async () => {
  const prevPokemonIdCookie = (await cookies()).get(COOKIES.PREV_POKEMON_ID);
  const prevPokemonId = Number(prevPokemonIdCookie?.value ?? 0);

  const statistic = await orm.query.statisticTable.findFirst({
    where: eq(statisticTable.pokemonId, prevPokemonId),
  });

  const prevPokemon = (await orm.query.pokemonTable.findFirst({
    where: eq(pokemonTable.pokemonId, prevPokemonId),
  }))!;

  const pokemonId = getRandomPokemonId();
  const pokemon = (await orm.query.pokemonTable.findFirst({
    where: eq(pokemonTable.pokemonId, pokemonId),
  }))!;

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex w-[300px] flex-col justify-center gap-4 transition ease-in-out">
        <PokemonCard className="h-[400px]" pokemon={pokemon}>
          <PokemonCardBackground
            src={`backgrounds/bg-${getPokemonBackground(pokemon?.types[0] as PokemonType)}.png`}
          />
          <PokemonCardImage />
          <PokemonContent>
            <PokemonCardTitle />
            <PokemonCardTypes />
            <PokemonCardDescription>
              {pokemon.description}
            </PokemonCardDescription>
          </PokemonContent>
        </PokemonCard>
        <PokemonActions pokemonId={pokemonId} />

        {statistic && (
          <PokemonStatistic pokemon={prevPokemon} statistic={statistic} />
        )}
      </div>
    </main>
  );
};

export default Home;
