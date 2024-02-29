"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Route Imports
// .env variables
const { PORT, CORS_ORIGIN, DATABASE_URI } = process.env;
console.log(DATABASE_URI);
// Middleware
app.use((0, cors_1.default)({ origin: CORS_ORIGIN }));
app.use(express_1.default.json());
// Home Route
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
// Routes
const poets_1 = __importDefault(require("./routes/poets"));
const poems_1 = __importDefault(require("./routes/poems"));
const analyses_1 = __importDefault(require("./routes/analyses"));
app.use("/poets", poets_1.default);
app.use("/poems", poems_1.default);
app.use("/analyses", analyses_1.default);
// Port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
