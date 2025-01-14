import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'motion/react';
import { forwardRef, useEffect, useState } from 'react';

export const SkeletonCard = forwardRef<HTMLLIElement, {index: number}>(({index, ...props}, ref) => {
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
    <motion.li
      ref={ref}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.2,
        delay: index * 0.1, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }}
      {...props}
      className="max-w-[400px] mx-auto p-4 rounded-lg shadow-sm bg-white grid grid-cols-12 gap-4 items-center"
    >
      <div className="col-span-2 text-center">
        <Skeleton className="h-6 w-10" />
      </div>

      <div className="col-span-2 flex items-center">
        <Skeleton className="h-12 w-12" />
      </div>

      <div className="col-span-3 flex flex-col gap-2">
        <Skeleton className="h-3 w-[80%]" />
        <Skeleton className="h-3 w-full" />
      </div>

      <div className="col-span-5 flex items-center gap-2">
        <Skeleton className="h-6 w-10" />
        <div
          className="h-6 rounded-md bg-green-300 transition-all duration-300 ease-in"
          style={{ width: `${statistic.smash}%` }}
        />
        <div
          className="h-6 rounded-md bg-red-300 transition-all duration-300 ease-in"
          style={{ width: `${statistic.pass}%` }}
        />
        <Skeleton className="h-6 w-10" />
      </div>
    </motion.li>
  );
})

SkeletonCard.displayName = 'SkeletonCard';