"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { cn } from "@/lib/utils";
import type { Pokemon, Statistic } from "@/utils/database/schema";
import type { PokemonType } from "@/utils/helpers";
import { getPokemonBackground } from "@/utils/helpers";

import {
  PokemonCard,
  PokemonCardBackground,
  PokemonCardImage,
  pokemonTypesVariants,
} from "../PokemonCard/PokemonCard";

type PokemonStatisticProps = {
  pokemon: Required<Pokemon>;
  statistic: Required<Statistic>;
};

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL);

export const PokemonStatistic = ({
  pokemon,
  statistic,
}: PokemonStatisticProps) => {
  const [pokemonStatatistic, setPokemonStatatistic] = useState<
    Required<Statistic>
  >({ ...statistic });

  useEffect(() => {
    setPokemonStatatistic({ ...statistic });
  }, [statistic]);

  useEffect(() => {
    socket.on("statistic", (data) => {
      console.log("statistic", data);

      if (data.pokemonId === statistic.pokemonId) {
        setPokemonStatatistic((prevStat) => ({
          ...prevStat,
          [data.action]: prevStat[data.action as "smash" | "pass"] + 1,
        }));
      }
    });

    return () => {
      socket.off("statistic");
    };
  }, [statistic.pokemonId]);

  const total = statistic.smash + statistic.pass;

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        What Others Chose for{" "}
        <span className={cn(pokemonTypesVariants({ type: pokemon.types[0] }))}>
          {pokemon.name}
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <div className="flex w-full flex-col items-end">
          <p>Passes</p>
          <div
            className="h-6 rounded-md bg-red-300 transition-all duration-300 ease-in"
            style={{ width: `${(pokemonStatatistic.pass / total) * 100}%` }}
          />
          <p>{pokemonStatatistic.pass}</p>
        </div>
        <PokemonCard className="h-[95px] w-full" pokemon={pokemon}>
          <PokemonCardBackground
            src={`backgrounds/bg-${getPokemonBackground(pokemon?.types[0] as PokemonType)}.png`}
          />
          <PokemonCardImage className="min-h-26 min-w-26" />
        </PokemonCard>
        <div className="flex w-full flex-col items-start">
          <p>Smashes</p>
          <div
            className="h-6 rounded-md bg-green-300 transition-all duration-300 ease-in"
            style={{ width: `${(pokemonStatatistic.smash / total) * 100}%` }}
          />
          <p>{pokemonStatatistic.smash}</p>
        </div>
      </div>
    </div>
  );
};
