import { Skeleton, Spinner } from '@/components/ui';

export const PokemonCardSkeleton = () => (
  <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
    <div className="absolute h-full w-full left-0 top-0 flex justify-center items-center">
      <Spinner className="stroke-gray-300 size-12" />
    </div>

    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 w-full">
      <Skeleton className="h-10 w-1/2 mb-2" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-8 w-full mt-4" />
    </div>
  </div>
);
