import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("poets", function (table) {
    table.increments("id");
    table.string("last_name", 255);
    table.string("first_name", 255);
    table.string("url_param", 255);
    table.integer("birth_year");
    table.integer("death_year");
    table.integer("category_id");
    table.string("img", 255);
    table.text("bio");
    table.string("bio_source", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
