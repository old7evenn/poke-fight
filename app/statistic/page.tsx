import { orm } from "@/utils/database/instance";

import { PokemonsStatistic } from "../(components)";

const Statistic = async () => {
  const statistic = await orm.query.statisticTable.findMany();
  const pokemon = (await orm.query.pokemonTable.findMany())!;

  return <PokemonsStatistic statistic={statistic} pokemon={pokemon} />;
};

export default Statistic;
