import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("titles", function (table) {
    table.increments("id").unsigned().primary();
    table.string("title", 255);
    table.integer("poet_id").nullable();
    table.integer("pub_year").nullable();
    table.integer("category_id").nullable();
    table.string("short_title", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
