import { Knex } from "knex";
import titles from "../seed-data/titles";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("titles").del();

  // Inserts seed entries
  await knex("titles").insert(titles);
}
