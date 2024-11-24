"use client";

import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { Card, CardDescription, CardTitle } from "@/components/ui";
import { cn } from "@/lib/utils";

type Pokemon = {
  description: string;
  image: string;
  name: string;
  pokemonId: number;
  types: string[];
};

type PokemonCardContextValue = {
  pokemon?: Pokemon;
};

const PokemonCardContext = React.createContext<PokemonCardContextValue>(
  {} as PokemonCardContextValue,
);

type PokemonCardProps = {
  pokemon?: Pokemon;
} & React.ComponentProps<"div">;

const PokemonCard = React.forwardRef<HTMLDivElement, PokemonCardProps>(
  ({ children, className, pokemon, ...props }, ref) => {
    const value = React.useMemo(() => ({ pokemon }), [pokemon]);

    return (
      <Card ref={ref} className={cn("relative", className)} {...props}>
        <PokemonCardContext.Provider value={value}>
          {children}
        </PokemonCardContext.Provider>
      </Card>
    );
  },
);
PokemonCard.displayName = "PokemonCard";

type PokemonCardBackgroundProps = {
  src: string;
} & React.ComponentProps<"div">;

const PokemonCardBackground = React.forwardRef<
  HTMLDivElement,
  PokemonCardBackgroundProps
>(({ className, src, ...props }, ref) => {
  console.log("@@PokemonCardBackground", src);

  return (
    <div
      style={{ backgroundImage: `url(${src})` }}
      ref={ref}
      className={cn(
        "absolute left-0 top-0 size-full select-none rounded-lg shadow-custom-inset",
        className,
      )}
      {...props}
    />
  );
});

const PokemonContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute bottom-0 mt-96 flex flex-col gap-2 p-4", className)}
    {...props}
  />
));

const PokemonCardImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentProps<"img">
>(({ className, ...props }, ref) => {
  const pokemonContext = React.useContext(PokemonCardContext);
  const pokemonImage = pokemonContext.pokemon?.image ?? props.src;

  return (
    <div className="absolute left-0 top-0 flex size-full select-none items-center justify-center">
      <img
        ref={ref}
        alt="pokemon"
        style={{ imageRendering: "pixelated" }}
        src={pokemonImage}
        className={cn("min-h-40 min-w-40", className)}
        {...props}
      />
    </div>
  );
});

const PokemonCardTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const pokemonContext = React.useContext(PokemonCardContext);
  const pokemonName = pokemonContext.pokemon?.name ?? props.children;

  return (
    <CardTitle
      ref={ref}
      className={cn("capitalize text-white", className)}
      {...props}
    >
      {pokemonName}
    </CardTitle>
  );
});
PokemonCardTitle.displayName = "PokemonCardTitle";

const PokemonCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <CardDescription
    ref={ref}
    className={cn("text-xs text-white", className)}
    {...props}
  />
));
PokemonCardDescription.displayName = "PokemonCardDescription";

export const pokemonTypesVariants = cva<{ type: Record<string, string> }>(
  "rounded-lg px-2 py-0.5 text-[10px] font-bold capitalize text-white",
  {
    defaultVariants: {
      type: "grass",
    },
    variants: {
      type: {
        bug: "dark:lime-500 bg-lime-600",
        dark: "bg-black dark:border-2 dark:bg-black",
        dragon: "dark:indigo-500 bg-indigo-600",
        electric: "dark:yellow-500 bg-yellow-600",
        fairy: "dark:pink-500 bg-pink-600",
        fighting: "dark:red-500 bg-red-600",
        fire: "dark:orange-500 bg-orange-600",
        flying: "dark:sky-500 bg-sky-600",
        ghost: "dark:purple-500 bg-purple-600",
        grass: "bg-green-600 dark:border-2 dark:bg-green-600",
        ground: "dark:amber-500 bg-amber-600",
        normal: "dark:neutral-500 bg-neutral-600",
        poison: "dark:violet-500 bg-violet-600",
        rock: "dark:stone-500 bg-stone-600",
        steel: "dark:zinc-500 bg-zinc-600",
        water: "dark:blue-500 bg-blue-600",
      },
    },
  },
);

type PokemonType = VariantProps<typeof pokemonTypesVariants>["type"];

export type PokemonCardTypeProps = {
  children: string;
} & React.ComponentProps<"div">;

const PokemonCardType = React.forwardRef<HTMLDivElement, PokemonCardTypeProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        pokemonTypesVariants({ className, type: children as PokemonType }),
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
PokemonCardType.displayName = "PokemonCardType";

const PokemonCardTypes = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ children, className, ...props }, ref) => {
  const pokemonContext = React.useContext(PokemonCardContext);
  const types = pokemonContext.pokemon?.types ?? [];

  return (
    <div ref={ref} className={cn("flex gap-1", className)} {...props}>
      {types.map((type) => (
        <PokemonCardType key={type} className="text-white">
          {type}
        </PokemonCardType>
      ))}
    </div>
  );
});
PokemonCardTypes.displayName = "PokemonCardTypes";

export {
  PokemonCard,
  PokemonCardBackground,
  PokemonCardDescription,
  PokemonCardImage,
  PokemonCardTitle,
  PokemonCardType,
  PokemonCardTypes,
  PokemonContent,
};
