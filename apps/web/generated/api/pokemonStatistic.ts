/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Poke - Fight
 * OpenAPI spec version: 1.0
 */
import { Statistic } from './statistic';

export interface PokemonStatistic {
  /** Pokémon description */
  description: string;
  /** Unique Pokémon identifier */
  id: string;
  /** Pokémon image URL */
  image: string;
  /** Pokémon name */
  name: string;
  /** Pokémon id */
  pokemonId: number;
  /** Pokemon Statistic */
  statistic: Statistic;
  /** Pokémon types */
  types: string[];
}
