/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Poke - Fight
 * OpenAPI spec version: 1.0
 */
import type { Pokemon } from './pokemon';

export interface PaginationPokemonsResponse {
  /** The total number of items available */
  itemCount: number;
  /** Indicates if there is a next page available */
  next: boolean;
  /** The number of items to retrieve per page */
  offset: number;
  /** The current page number (starting from 1) */
  page: number;
  /** The total number of pages available based on the item count and take */
  pageCount: number;
  /** Pokemons */
  pokemons: Pokemon[];
  /** Indicates if there is a previous page available */
  prev: boolean;

  limit: number;
}
