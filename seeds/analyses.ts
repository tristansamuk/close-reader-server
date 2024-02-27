import { Knex } from "knex";
import analyses from "../seed-data/analyses";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("analyses").del();

  // Inserts seed entries
  await knex("analyses").insert(analyses);
}
