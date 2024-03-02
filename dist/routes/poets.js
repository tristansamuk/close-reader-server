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
// GET all poets
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.db
            .select({
            id: schema_1.poets.id,
            firstName: schema_1.poets.firstName,
            lastName: schema_1.poets.lastName,
            img: schema_1.poets.img,
            urlParam: schema_1.poets.urlParam,
        })
            .from(schema_1.poets)
            .orderBy(schema_1.poets.lastName);
        res.status(200).json(data);
    }
    catch (_a) {
        res.status(500).send("Error getting poets");
    }
}));
// GET single poet information
router.get("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poetName = req.params.name;
        const data = yield db_1.db
            .select()
            .from(schema_1.poets)
            .where((0, drizzle_orm_1.eq)(schema_1.poets.urlParam, poetName));
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poet information");
        console.log(error);
    }
}));
exports.default = router;
