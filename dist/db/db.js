"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
// import { users } from "./schema";
const connectionString = process.env.DATABASE_URI;
// Disable prefetch as it is not supported for "Transaction" pool mode
const client = (0, postgres_1.default)(connectionString, { prepare: false });
const db = (0, postgres_js_1.drizzle)(client);
exports.default = db;
