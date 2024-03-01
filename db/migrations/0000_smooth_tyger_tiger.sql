CREATE TABLE IF NOT EXISTS "analyses" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"title_id" integer NOT NULL,
	"analysis" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "poems" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"poet_id" integer NOT NULL,
	"title_id" integer NOT NULL,
	"lines" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "poets" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"last_name" text NOT NULL,
	"first_name" text NOT NULL,
	"url_param" text NOT NULL,
	"birth_year" integer NOT NULL,
	"death_year" integer NOT NULL,
	"bio" text NOT NULL,
	"bio_source" text NOT NULL,
	"img" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "titles" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"title" text NOT NULL,
	"poet_id" integer NOT NULL,
	"pub_year" integer NOT NULL,
	"short_title" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analyses" ADD CONSTRAINT "analyses_title_id_titles_id_fk" FOREIGN KEY ("title_id") REFERENCES "titles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poems" ADD CONSTRAINT "poems_poet_id_poets_id_fk" FOREIGN KEY ("poet_id") REFERENCES "poets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poems" ADD CONSTRAINT "poems_title_id_titles_id_fk" FOREIGN KEY ("title_id") REFERENCES "titles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "titles" ADD CONSTRAINT "titles_poet_id_poets_id_fk" FOREIGN KEY ("poet_id") REFERENCES "poets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
