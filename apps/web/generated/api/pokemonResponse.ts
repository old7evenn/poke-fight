/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Poke - Fight
 * OpenAPI spec version: 1.0
 */
import type { Pokemon } from './pokemon';

export interface PokemonResponse {
  /** Pokemon */
  pokemon: Pokemon;
  /**
   * Error
   * @nullable
   */
  reason?: string | null;
  /** Request status */
  success: boolean;
}