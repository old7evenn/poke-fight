import { MAX_POKEMON_COUNTS } from "../constants/pokemon";

export const getRandomPokemonId = () =>
  Math.round(Math.random() * MAX_POKEMON_COUNTS);
