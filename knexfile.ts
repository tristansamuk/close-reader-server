import { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "rootroot",
      database: "closeReaderDB",
      charset: "utf8",
    },
  },
};

export default config;
