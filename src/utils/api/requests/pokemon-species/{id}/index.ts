import type { PokemonSpecies } from "@/generated/api/models";
import { pokeApi } from "@/utils/api/instance";

export type GetPokemonSpeciesParams = {
  id: number | string;
};

export type GetPokemonSpeciesRequestConfig =
  RequestConfig<GetPokemonSpeciesParams>;

export const getPokemonSpecies = ({
  config,
  params,
}: GetPokemonSpeciesRequestConfig) =>
  pokeApi.get<PokemonSpecies>(`/pokemon-species/${params.id}`, config);
