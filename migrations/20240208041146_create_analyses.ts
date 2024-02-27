import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("your_table_name", function (table) {
    table.increments("id").unsigned().primary();
    table.integer("title_id").nullable();
    table.text("analysis").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
