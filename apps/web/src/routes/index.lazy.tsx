import { createLazyFileRoute } from '@tanstack/react-router';
import { Heart, ThumbsDown } from 'lucide-react';

import {
  Button,
  PokemonCard,
  PokemonCardBackground,
  PokemonCardContent,
  PokemonCardDescription,
  PokemonCardImage,
  PokemonCardTitle,
  PokemonCardTypes,
} from '@/components/ui';
import { getPokemonBackground, ROUTES } from '@/utils';
import { motion } from 'motion/react';

import { Header } from './-components/Header/Header';
import { PokemonCardSkeleton } from './-components/PokemonCard/PokemonCardSkeleton';
import { PokemonStatistic } from './-components/PokemonStatistic/PokemonStatistic';
import { useMainPage } from './-hooks/useMainPage';

const MainPage = () => {
  const { state, functions, loading, pending } = useMainPage();

  return (
    <div className="p-6 overflow-hidden">
      <Header />
      <main className="flex flex-col items-center justify-between">
        <motion.div
          className="flex w-[300px] flex-col justify-center gap-4 transition ease-in-out"
          initial={{ y: -1000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            drag
            dragConstraints={{
              left: 0,
              bottom: 0,
              top: 0,
              right: 0,
            }}
            dragElastic={{
              top: 0.2,
              bottom: 0.2,
              right: 1,
              left: 1,
            }}
            style={{
              x: state.card.x,
              rotate: state.card.rotate,
            }}
            animate={state.card.controls}
            whileDrag={{ scale: 1.05 }}
            onDragEnd={(_event, info) => {
              if (pending.action || loading.pokemon) return;
              if (info.offset.x > -300 && info.offset.x < 300) return;
              const action = info.offset.x > 0 ? 'smash' : 'pass';
              functions.onCardDragEnd(action);
            }}
          >
            {loading.pokemon && <PokemonCardSkeleton />}
            {state.pokemon && !loading.pokemon && (
              <PokemonCard className="h-[400px]" pokemon={state.pokemon}>
                <PokemonCardBackground
                  src={`backgrounds/bg-${getPokemonBackground(state.pokemon.types[0])}.png`}
                />
                <PokemonCardImage />
                <PokemonCardContent>
                  <PokemonCardTitle />
                  <PokemonCardTypes />
                  <PokemonCardDescription>{state.pokemon.description}</PokemonCardDescription>
                </PokemonCardContent>
              </PokemonCard>
            )}
          </motion.div>
          <div className="flex gap-2">
            <Button
              className="w-full hover:bg-red-100"
              disabled={loading.pokemon}
              variant="outline"
              onClick={() => functions.onActionClick('pass')}
            >
              <ThumbsDown className="size-4 mr-2" />
              PASS
            </Button>
            <Button
              className="w-full hover:bg-green-100"
              disabled={loading.pokemon}
              variant="outline"
              onClick={() => functions.onActionClick('smash')}
            >
              <Heart className="size-4 mr-2" />
              SMASH
            </Button>
          </div>
          <PokemonStatistic />
        </motion.div>
      </main>
    </div>
  );
};

export const Route = createLazyFileRoute(ROUTES.MAIN)({
  component: MainPage,
});
