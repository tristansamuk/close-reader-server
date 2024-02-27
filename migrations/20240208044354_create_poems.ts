import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("poets", function (table) {
    table.increments("id");
    table.integer("poet_id");
    table.integer("title_id");
    table.string("lns", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
