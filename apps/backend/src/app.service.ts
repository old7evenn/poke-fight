import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PokemonService } from './modules/pokemon';
import { getPokemon, getPokemons, getPokemonSpecies } from './utils/api/requests';

const MAX_POKEMON_COUNTS = 65;

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly pokemonService: PokemonService) {}

  async onApplicationBootstrap() {
    const pokemons = await this.pokemonService.findAll();

    if (pokemons.length >= MAX_POKEMON_COUNTS) {
      console.log('pokemons seed:', pokemons.length, 'already injected');
      return
    };

    await this.pokemonService.clear()

    const pokemonsResponse = await getPokemons({
      params: { limit: MAX_POKEMON_COUNTS, offset: 0 },
    });
    
    const poromises = pokemonsResponse.results.map(async pokemon => {
      const pokemonResponse = await getPokemon({
        params: { id: pokemon.name },
        config: { cache: 'force-cache' },
      });
      const pokemonSpeciesResponse = await getPokemonSpecies({
        params: { id: pokemonResponse.id },
        config: { cache: 'force-cache' },
      });
      await new Promise(res => setTimeout(res, 1000));

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
      .filter(item => item && item.pokemonResponse && item.pokemonSpeciesResponse)
      .map(({ pokemonResponse, pokemonSpeciesResponse }) => ({
        pokemonId: pokemonResponse.id,
        name: pokemonResponse.name,
        image:
          pokemonResponse.id < 649
            ? pokemonResponse.sprites.versions['generation-v']['black-white'].animated
                .front_default!
            : pokemonResponse.sprites.front_default!,
        description:
          pokemonSpeciesResponse.flavor_text_entries
            .find(text => text.language.name === 'en')
            ?.flavor_text.replaceAll(/\f/g, ' ') ?? 'Succelent, Beautiful.',
        types: pokemonResponse.types.map(({ type }) => type.name),
      }));

    await this.pokemonService.insert(values);
  }
}
