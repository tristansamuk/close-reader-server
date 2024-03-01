import {
  pgTable,
  serial,
  timestamp,
  text,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const poets = pgTable("poets", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  lastName: text("last_name").notNull(),
  firstName: text("first_name").notNull(),
  urlParam: text("url_param").notNull(),
  birthYear: integer("birth_year").notNull(),
  deathYear: integer("death_year").notNull(),
  bio: text("bio").notNull(),
  bioSource: text("bio_source").notNull(),
  img: text("img").notNull(),
});

export const titles = pgTable("titles", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  title: text("title").notNull(),
  poetID: integer("poet_id")
    .references(() => poets.id)
    .notNull(),
  pubYear: integer("pub_year").notNull(),
  shortTitle: text("short_title").notNull(),
});

export const poems = pgTable("poems", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  poetID: integer("poet_id")
    .references(() => poets.id)
    .notNull(),
  titleId: integer("title_id")
    .references(() => titles.id)
    .notNull(),
  lines: jsonb("lines").notNull(),
});

export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  titleID: integer("title_id")
    .references(() => titles.id)
    .notNull(),
  analysis: text("analysis").notNull(),
});
