import type { ItemListParams } from '@/generated/api';
import { NamedAPIResourceList } from '@/generated/api/models';

import { pokeApi } from '@/utils/api/instance';

export type GetPokemonsParams = ItemListParams;

export type GetPokemonsRequestConfig = RequestConfig<ItemListParams>;

export const getPokemons = ({ config, params }: GetPokemonsRequestConfig) =>
  pokeApi.get<NamedAPIResourceList>('/pokemon', { params, ...config });
