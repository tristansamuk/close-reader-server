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
const openai_1 = __importDefault(require("openai"));
const router = express_1.default.Router();
const db_1 = require("../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
const apiKey = process.env.API_KEY;
const openai = new openai_1.default({ apiKey: apiKey });
// Middleware
const checkForAnalysis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // GET request to database to check for pre-existing analysis
    try {
        const poemTitle = req.params.poemTitle;
        const data = yield db_1.db
            .select({
            id: schema_1.analyses.id,
            analysis: schema_1.analyses.analysis,
            shortTitle: schema_1.titles.shortTitle,
        })
            .from(schema_1.analyses)
            .innerJoin(schema_1.titles, (0, drizzle_orm_1.eq)(schema_1.titles.id, schema_1.analyses.titleID))
            .where((0, drizzle_orm_1.eq)(schema_1.titles.shortTitle, poemTitle));
        // If no analysis in database, request new analysis from GPT
        if (!data[0]) {
            // GET request to database using params stored in `poemTitle` to get poet name, title of poem, and title id
            const poetTitle = yield db_1.db
                .select({
                id: schema_1.poets.id,
                firstName: schema_1.poets.firstName,
                lastName: schema_1.poets.lastName,
                title: schema_1.titles.title,
                titleId: schema_1.titles.id,
            })
                .from(schema_1.poets)
                .innerJoin(schema_1.titles, (0, drizzle_orm_1.eq)(schema_1.titles.poetID, schema_1.poets.id))
                .where((0, drizzle_orm_1.eq)(schema_1.titles.shortTitle, poemTitle));
            const poetName = `${poetTitle[0].firstName} ${poetTitle[0].lastName}`;
            const titleOfPoem = poetTitle[0].title;
            const titleId = poetTitle[0].titleId;
            // Makes POST request to GPT to generate new analysis
            const sendToGPT = () => __awaiter(void 0, void 0, void 0, function* () {
                const completion = yield openai.chat.completions.create({
                    model: "gpt-4",
                    messages: [
                        {
                            role: "system",
                            content: "As an expert in poetry, your task is to provide an insightful interpretation of poem titles submitted to you. Your response should offer a concise analysis that aids readers in grasping the poem's themes and core message. Highlight key aspects to focus on, such as notable imagery, metaphors, and any lines of particular significance, offering multiple interpretations where applicable. Additionally, contextualize the poem within its historical or biographical landscape to enrich the reader's understanding. When discussing famous or complex passages, ensure your explanation is both informed by academic scholarship and presented in a manner that is engaging and accessible to a general audience. Aim for a tone that's both knowledgeable and inviting, as if you're discussing the poem with an enthusiastic friend. Please refrain from using headings in your analysis.",
                        },
                        {
                            role: "user",
                            content: `"${titleOfPoem}" by ${poetName}`,
                        },
                    ],
                    temperature: 0.7,
                });
                const poemAnalysis = completion.choices[0].message.content;
                // Error handling for GPT post request
                if (!poemAnalysis) {
                    res.status(500).send("Error generating new analysis");
                }
                // Post the resulting analysis to the database
                yield db_1.db.insert(schema_1.analyses).values({
                    titleID: Number(`${titleId}`),
                    analysis: `${poemAnalysis}`,
                });
                res.status(201).send(poemAnalysis);
            });
            // Calling the function
            sendToGPT();
        }
        else {
            res.status(200).json(data[0].analysis);
        }
    }
    catch (error) {
        res.status(500).send("Error getting analysis");
        console.log(error);
    }
    next();
});
// GET analysis of a poem from database
router.get("/:poemTitle", checkForAnalysis, () => __awaiter(void 0, void 0, void 0, function* () {
    // Response is handled by middleware after it performs a check of the database
}));
exports.default = router;
