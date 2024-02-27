import { Knex } from "knex";
import poems from "../seed-data/poems";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("poems").del();

  // Inserts seed entries
  await knex("poems").insert(poems);
}
