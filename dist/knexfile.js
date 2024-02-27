"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
