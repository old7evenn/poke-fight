import { useEffect, useState } from 'react';

import { Skeleton } from '@/components/ui';

export const PokemonStatisticSkeleton = () => {
  const [statistic, setStatistic] = useState({ pass: 50, smash: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 100);
      setStatistic(() => ({
        pass: random,
        smash: 100 - random,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="text-center flex gap-2 justify-center items-center">
        What Others Chose for <Skeleton className="h-4 w-16 rounded-md" />
      </div>

      <div className="flex gap-2 justify-center items-center text-sm font-medium">
        <div className="flex flex-col gap-1 items-end w-full">
          <p>Passes</p>
          <div
            className="h-6 rounded-md bg-red-300 transition-all duration-300 ease-in"
            style={{ width: `${statistic.pass}%` }}
          />
          <Skeleton className="h-4 w-6 rounded-md" />
        </div>

        <div className="relative flex items-center justify-center h-[94px] w-full">
          <Skeleton className="absolute inset-0 h-full w-full rounded-lg" />
        </div>

        <div className="flex flex-col gap-1 items-start w-full">
          <p>Smashes</p>
          <div
            className="h-6 rounded-md bg-green-300 transition-all duration-300 ease-in"
            style={{ width: `${statistic.smash}%` }}
          />
          <Skeleton className="h-4 w-6 rounded-md" />
        </div>
      </div>
    </div>
  );
};
