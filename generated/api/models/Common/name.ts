import type { NamedAPIResource } from "./resource";

/**
 * The localized name for an API resource in a specific language
 */
export type Name = {
  /** The localized name for an API resource in a specific language */
  name: string;
  /** The language this name is in */
  language: NamedAPIResource;
};
