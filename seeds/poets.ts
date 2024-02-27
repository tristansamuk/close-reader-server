import { Knex } from "knex";
import poets from "../seed-data/poets";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("poets").del();

  // Inserts seed entries
  await knex("poets").insert(poets);
}
