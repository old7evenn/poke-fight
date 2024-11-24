"use client";

import { useEffect, useState } from "react";

import type { Pokemon, Statistic } from "@/utils/database/schema";

import { socket } from "../PokemonStatistic/PokemonStatistic";
import { PokemonStatisticCard } from "../PokemonStatisticCard/PokemonStatisticCard";

type PokemonsStatisticProps = {
  pokemon: Required<Pokemon>[];
  statistic: Required<Statistic>[];
};

type StatisticAction = {
  action: "pass" | "smash";
  pokemonId: number;
};

export const PokemonsStatistic = ({
  pokemon,
  statistic: initialStatistic,
}: PokemonsStatisticProps) => {
  const [statistics, setStatistics] = useState<Required<Statistic>[]>(
    initialStatistic || [],
  );

  useEffect(() => {
    setStatistics(initialStatistic || []);
  }, [initialStatistic]);

  useEffect(() => {
    const handleStatisticUpdate = (data: StatisticAction) => {
      setStatistics((currentStats) =>
        currentStats.map((stat) => {
          if (stat.pokemonId === data.pokemonId) {
            return {
              ...stat,
              [data.action]: stat[data.action] + 1,
            };
          }

          return stat;
        }),
      );
    };

    socket.on("statistic", handleStatisticUpdate);

    return () => {
      socket.off("statistic", handleStatisticUpdate);
    };
  }, []);

  const statisticSorted = [...statistics].sort((a, b) => {
    const totalA = a.pass + a.smash;
    const totalB = b.pass + b.smash;

    return totalB - totalA;
  });

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statisticSorted.map((stat) => {
        const matchedPokemon = pokemon.find(
          (p) => p.pokemonId === stat.pokemonId,
        );

        if (!matchedPokemon) {
          return null;
        }

        return (
          <li key={stat.id}>
            <PokemonStatisticCard
              statistic={stat}
              pokemon={matchedPokemon}
              total={stat.pass + stat.smash}
            />
          </li>
        );
      })}
    </ul>
  );
};
