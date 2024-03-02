"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = require("./db");
const schema_1 = require("./schema");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Seeding database...");
        // Delete all data (optional)
        // await db.delete(poets);
        // await db.delete(titles);
        // await db.delete(poems);
        // await db.delete(analyses);
        yield db_1.db.insert(schema_1.poets).values([]);
        yield db_1.db.insert(schema_1.titles).values([]);
        yield db_1.db.insert(schema_1.poems).values([]);
        yield db_1.db.insert(schema_1.analyses).values([]);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
main().then(() => process.exit());
