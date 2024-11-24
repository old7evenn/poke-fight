import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const pokemonTable = pgTable("pokemon", {
  id: uuid("id").defaultRandom().primaryKey(),
  pokemonId: integer("pokemon_id").notNull(),
  name: text("name").unique().notNull(),
  image: text("image").unique().notNull(),
  description: text("description").notNull(),
  types: text("types").array().default([]).notNull(),
});

export const statisticTable = pgTable("statistic", {
  id: uuid("id").defaultRandom().primaryKey(),
  pass: integer("pass").default(0).notNull(),
  pokemonId: integer("pokemon_id").notNull(),
  smash: integer("smash").default(0).notNull(),
});

export type Pokemon = typeof pokemonTable.$inferInsert;

export type Statistic = typeof statisticTable.$inferInsert;
