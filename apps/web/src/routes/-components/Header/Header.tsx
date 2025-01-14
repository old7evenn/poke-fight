import { Link } from '@tanstack/react-router';
import { HeartIcon } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui';

export const Header = () => (
  <header className="h-15 mb-10 flex items-center justify-between">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pokemon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[500px] gap-3 p-6 lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-pink-300 to-fuchsia-100 p-6 no-underline outline-none focus:shadow-md">
                    <HeartIcon className="size-6" />
                    <div className="mt-2 text-lg font-medium">Smash or pass</div>
                    <p className="text-sm leading-tight">
                      A game in which players evaluate the sexual desirability
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    to="/"
                  >
                    <div className="text-sm font-medium leading-none">Choose your poke</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Choose your favorite pokemon
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    to="/statistic"
                  >
                    <div className="text-sm font-medium leading-none">Statistic</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Statistic of all pokemon matches
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Fightings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Arena</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Choose your favorite pokemons and fight
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Pokemons</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Pokedex of pokemons with statistics
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
);
