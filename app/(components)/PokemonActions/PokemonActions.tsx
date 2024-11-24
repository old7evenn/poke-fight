"use client";

import { CircleOff, Heart } from "lucide-react";
import { useTransition } from "react";

import { Button } from "@/components/ui";

import { pokemonAction } from "../../(actions)/pokemonAction";

export type PokemonActionsProps = {
  pokemonId: number;
};

export const PokemonActions = ({ pokemonId }: PokemonActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const onActionClick = (action: "pass" | "smash") => {
    startTransition(() => {
      pokemonAction(pokemonId, action);
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        disabled={isPending}
        className="w-full hover:bg-red-300"
        onClick={() => onActionClick("pass")}
      >
        <CircleOff className="mr-2 size-4" />
        PASS
      </Button>
      <Button
        variant="outline"
        disabled={isPending}
        className="w-full hover:bg-green-300"
        onClick={() => onActionClick("smash")}
      >
        <Heart className="mr-2 size-4" />
        SMASH
      </Button>
    </div>
  );
};
