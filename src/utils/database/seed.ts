import { getPokemon, getPokemons, getPokemonSpecies } from "../api/requests";
import { MAX_POKEMON_COUNTS } from "../constants/pokemon";
import { orm } from "./instance";
import { pokemonTable } from "./schema";

export const seed = async () => {
  const pokemons = await orm.select().from(pokemonTable);

  if (pokemons.length) {
    return;
  }

  const pokemonsResponse = await getPokemons({
    params: { limit: MAX_POKEMON_COUNTS, offset: 0 },
  });

  const poromises = pokemonsResponse.results.map(async (pokemon) => {
    const pokemonResponse = await getPokemon({
      params: { id: pokemon.name },
      config: { cache: "force-cache" },
    });
    const pokemonSpeciesResponse = await getPokemonSpecies({
      params: { id: pokemonResponse.id },
      config: { cache: "force-cache" },
    });
    await new Promise((res) => setTimeout(res, 1000));

    return {
      pokemonResponse,
      pokemonSpeciesResponse,
    };
  });

  const responses = [];

  for (let i = 0; i <= MAX_POKEMON_COUNTS; i++) {
    responses.push(await poromises[i]);
  }

  const values = responses
    .filter(
      (item) => item && item.pokemonResponse && item.pokemonSpeciesResponse,
    )
    .map(({ pokemonResponse, pokemonSpeciesResponse }) => ({
      pokemonId: pokemonResponse.id,
      name: pokemonResponse.name,
      image:
        pokemonResponse.id < 649
          ? pokemonResponse.sprites.versions["generation-v"]["black-white"]
              .animated.front_default!
          : pokemonResponse.sprites.front_default!,
      description:
        pokemonSpeciesResponse.flavor_text_entries
          .find((text) => text.language.name === "en")
          ?.flavor_text.replaceAll(/\f/g, " ") ?? "Succelent, Beautiful.",
      types: pokemonResponse.types.map(({ type }) => type.name),
    }));

  await orm.insert(pokemonTable).values(values);
};
