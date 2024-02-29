"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyses = exports.poems = exports.titles = exports.poets = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.poets = (0, pg_core_1.pgTable)("poets", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow(),
    lastName: (0, pg_core_1.text)("last_name").notNull(),
    firstName: (0, pg_core_1.text)("first_name").notNull(),
    urlParam: (0, pg_core_1.text)("url_param").notNull(),
    birthYear: (0, pg_core_1.integer)("birth_year").notNull(),
    deathYear: (0, pg_core_1.integer)("death_year").notNull(),
    bio: (0, pg_core_1.text)("bio").notNull(),
    bioSource: (0, pg_core_1.text)("bio_source").notNull(),
    img: (0, pg_core_1.text)("img").notNull(),
});
exports.titles = (0, pg_core_1.pgTable)("titles", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow(),
    title: (0, pg_core_1.text)("title").notNull(),
    poetID: (0, pg_core_1.integer)("poet_id")
        .references(() => exports.poets.id)
        .notNull(),
    pubYear: (0, pg_core_1.integer)("pub_year").notNull(),
    shortTitle: (0, pg_core_1.text)("short_title").notNull(),
});
exports.poems = (0, pg_core_1.pgTable)("poems", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow(),
    poetID: (0, pg_core_1.integer)("poet_id")
        .references(() => exports.poets.id)
        .notNull(),
    titleId: (0, pg_core_1.integer)("title_id")
        .references(() => exports.titles.id)
        .notNull(),
    lines: (0, pg_core_1.jsonb)("lines").notNull(),
});
exports.analyses = (0, pg_core_1.pgTable)("analyses", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow(),
    titleID: (0, pg_core_1.integer)("title_id")
        .references(() => exports.titles.id)
        .notNull(),
    analysis: (0, pg_core_1.text)("analysis").notNull(),
});
