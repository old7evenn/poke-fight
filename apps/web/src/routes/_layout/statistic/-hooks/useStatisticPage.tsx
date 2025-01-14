import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useInView } from './useInView';
import { PaginationPokemonsStatisticResponse, PokemonStatistic } from '@/generatedapi';
import { debounce } from 'lodash';

const BASE_ITEMS_PER_PAGE = 10;
const SOCKET_URL = 'http://localhost:3000';
const DEBOUNCE_DELAY = 300;

export const useStatisticPage = () => {
  const [state, setState] = useState({
    pokemons: [] as PokemonStatistic[],
    isLoading: false,
    hasMore: true,
  });

  const socketRef = useRef<Socket | null>(null);
  const pageStateRef = useRef({
    currentPage: 0,
    totalItems: 0,
    loadedPages: new Set<number>(),
  });

  const calculateLimit = useCallback((page: number) => BASE_ITEMS_PER_PAGE * (page + 1), []);

  const calculateOffset = useCallback(
    (page: number) => (page > 0 ? pageStateRef.current.totalItems : 0),
    []
  );

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    loadPage(0);
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const loadPage = useCallback(
    (page: number) => {
      if (!socketRef.current || state.isLoading || pageStateRef.current.loadedPages.has(page))
        return;

      setState(prev => ({ ...prev, isLoading: true }));

      socketRef.current.emit('loadMore', {
        offset: calculateOffset(page),
        limit: calculateLimit(page),
      });

      pageStateRef.current.loadedPages.add(page);
      pageStateRef.current.currentPage = page;
    },
    [state.isLoading, calculateOffset, calculateLimit]
  );

  const hasStatisticChanged = useCallback(
    (oldPokemon: PokemonStatistic, newPokemon: PokemonStatistic) =>
      oldPokemon.statistic.pass !== newPokemon.statistic.pass ||
      oldPokemon.statistic.smash !== newPokemon.statistic.smash,
    []
  );

  const updatePokemonsList = useCallback(
    (statistics: PaginationPokemonsStatisticResponse) => {
      setState(prev => {
        const existingIds = new Set(prev.pokemons.map(p => p.pokemonId));
        const newPokemons = statistics.pokemons.filter(
          pokemon => !existingIds.has(pokemon.pokemonId)
        );
        let hasUpdates = false;
        const updatedPokemons = prev.pokemons.map(pokemon => {
          const updated = statistics.pokemons.find(p => p.pokemonId === pokemon.pokemonId);
          if (updated && hasStatisticChanged(pokemon, updated)) {
            hasUpdates = true;
            return { ...pokemon, ...updated };
          }
          return pokemon;
        });
        if (newPokemons.length === 0 && !hasUpdates) {
          return prev;
        }
        pageStateRef.current.totalItems = updatedPokemons.length + newPokemons.length;
        return {
          ...prev,
          pokemons: statistics.pokemons,
          isLoading: false,
          hasMore: statistics.next,
        };
      });
    },
    [hasStatisticChanged]
  );

  useEffect(() => {
    if (!socketRef.current) return;

    const debouncedStatisticsUpdate = debounce(updatePokemonsList, DEBOUNCE_DELAY);

    socketRef.current.on('statisticsUpdate', debouncedStatisticsUpdate);
    socketRef.current.on('error', error => {
      console.error('Socket error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    });

    return () => {
      socketRef.current?.off('statisticsUpdate', debouncedStatisticsUpdate);
      socketRef.current?.off('error');
    };
  }, [updatePokemonsList]);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '300px',
  });

  useEffect(() => {
    if (inView && !state.isLoading && state.hasMore) {
      const timeoutId = setTimeout(() => {
        loadPage(pageStateRef.current.currentPage + 1);
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, loadPage, state.isLoading, state.hasMore]);

  const updateFilters = useCallback((filters: { name?: string; types?: string[] }) => {
    if (!socketRef.current) return;

    socketRef.current.emit('updateFilters', filters);
    pageStateRef.current = {
      currentPage: 0,
      totalItems: 0,
      loadedPages: new Set(),
    };
    setState(prev => ({ ...prev, pokemons: [], hasMore: true }));
  }, []);

  return {
    refs: { view: { ref, inView } },
    state,
    actions: { updateFilters },
  };
};
