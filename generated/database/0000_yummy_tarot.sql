CREATE TABLE IF NOT EXISTS "pokemon" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pokemon_id" integer NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"types" text[] DEFAULT '{}' NOT NULL,
	CONSTRAINT "pokemon_name_unique" UNIQUE("name"),
	CONSTRAINT "pokemon_image_unique" UNIQUE("image")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statistic" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pass" integer DEFAULT 0 NOT NULL,
	"pokemon_id" integer NOT NULL,
	"smash" integer DEFAULT 0 NOT NULL
);
