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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_1 = require("../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
// GET titles of all poems
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.db
            .select({
            id: schema_1.titles.id,
            title: schema_1.titles.title,
            shortTitle: schema_1.titles.shortTitle,
            pubYear: schema_1.titles.pubYear,
            firstName: schema_1.poets.firstName,
            lastName: schema_1.poets.lastName,
        })
            .from(schema_1.titles)
            .innerJoin(schema_1.poets, (0, drizzle_orm_1.eq)(schema_1.poets.id, schema_1.titles.poetID))
            .orderBy(schema_1.titles.title);
        res.json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poem titles");
        console.log(error);
    }
}));
// // GET list of poems by a single poet
router.get("/:poetName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poetName = req.params.poetName;
        const data = yield db_1.db
            .select({
            title: schema_1.titles.title,
            firstName: schema_1.poets.firstName,
            lastName: schema_1.poets.lastName,
            urlParam: schema_1.poets.urlParam,
            titleId: schema_1.titles.id,
            pubYear: schema_1.titles.pubYear,
            shortTitle: schema_1.titles.shortTitle,
        })
            .from(schema_1.titles)
            .innerJoin(schema_1.poets, (0, drizzle_orm_1.eq)(schema_1.poets.id, schema_1.titles.poetID))
            .where((0, drizzle_orm_1.eq)(schema_1.poets.urlParam, poetName));
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poems");
        console.log(error);
    }
}));
// // GET single Poem (data use to render lines of poem on SinglePoemPage)
router.get("/titles/:poemTitle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poemTitle = req.params.poemTitle;
        const data = yield db_1.db
            .select({
            id: schema_1.poems.id,
            lines: schema_1.poems.lines,
            shortTitle: schema_1.titles.shortTitle,
        })
            .from(schema_1.poems)
            .innerJoin(schema_1.titles, (0, drizzle_orm_1.eq)(schema_1.poems.titleId, schema_1.titles.id))
            .where((0, drizzle_orm_1.eq)(schema_1.titles.shortTitle, poemTitle));
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poems");
        console.log(error);
    }
}));
// // GET poem information (data used to render author, title, and publication date on poem page)
router.get("/info/:poemTitle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poemTitle = req.params.poemTitle;
        const data = yield db_1.db
            .select({
            firstName: schema_1.poets.firstName,
            lastName: schema_1.poets.lastName,
            urlParam: schema_1.poets.urlParam,
            title: schema_1.titles.title,
            pubYear: schema_1.titles.pubYear,
        })
            .from(schema_1.titles)
            .innerJoin(schema_1.poets, (0, drizzle_orm_1.eq)(schema_1.titles.poetID, schema_1.poets.id))
            .where((0, drizzle_orm_1.eq)(schema_1.titles.shortTitle, poemTitle));
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poems");
        console.log(error);
    }
}));
exports.default = router;
