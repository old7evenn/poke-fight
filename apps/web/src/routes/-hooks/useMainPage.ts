import { keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';

import { getRandomPokemonId, LOCAL_STORAGE_KEYS } from '@/utils';
import { useGetPokemonQuery, usePostStatisticActionMutation } from '@/utils/api/hooks';
import { useAnimationCard } from './useAnimationCard';

export const useMainPage = () => {
  const animationCard = useAnimationCard();
  const [randomPokemonId, setRandomPokemonId] = useState(getRandomPokemonId);

  const getPokemonQuery = useGetPokemonQuery(
    { pokemonId: randomPokemonId },
    {
      options: {
        placeholderData: keepPreviousData,
      },
    }
  );

  const postStatisticActionMutation = usePostStatisticActionMutation();

  const pokemonAction = async (action: 'pass' | 'smash') => {
    await postStatisticActionMutation.mutateAsync({
      params: { pokemonId: randomPokemonId, action },
    });
    localStorage.setItem(LOCAL_STORAGE_KEYS.PREV_POKEMON_ID, randomPokemonId.toString());
    setRandomPokemonId(getRandomPokemonId());
  };

  const onCardDragEnd = async (action: 'pass' | 'smash') => {
    await animationCard.controls.start({
      x: action === 'pass' ? -500 : 500,
      rotate: 45,
      opacity: 0,
      transition: { duration: 0.3 },
    });

    await pokemonAction(action);

    await animationCard.controls.set({ y: -300, opacity: 0, x: 0, rotate: 0 });
    await animationCard.controls.start({
      y: 0,
      opacity: 1,
    });
  };

  const onActionClick = async (action: 'pass' | 'smash') => {
    await animationCard.controls.start({
      x: action === 'pass' ? -500 : 500,
      rotate: 45,
      opacity: 0,
      transition: { duration: 0.3 },
    });
    await animationCard.controls.set({
      y: -100,
      x: 0,
      transition: { duration: 0 },
    });
    await pokemonAction(action);

    await animationCard.controls.start({
      y: 0,
      opacity: 1,
    });
  };

  return {
    state: {
      pokemon: getPokemonQuery.data?.pokemon,
      card: animationCard,
    },
    pending: {
      action: postStatisticActionMutation.isPending,
    },
    loading: {
      pokemon: getPokemonQuery.isFetching,
    },
    functions: {
      onActionClick,
      onCardDragEnd,
    },
  };
};
