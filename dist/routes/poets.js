"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Get list of poets
// router.get("/", async (_req: Request, res: Response) => {
//   try {
//     const data = await db("poets")
//       .select(
//         "poets.id",
//         "poets.first_name",
//         "poets.last_name",
//         "poets.img",
//         "poets.url_param"
//       )
//       .orderBy("last_name");
//     res.status(200).json(data);
//   } catch {
//     res.status(500).send("Error getting poets");
//   }
// });
// // Get single poet information
// router.get("/:name", async (req: Request, res: Response) => {
//   try {
//     const poetName = req.params.name;
//     const data = await db("poets")
//       .select("*")
//       .where("poets.url_param", poetName);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).send("Error getting poet information");
//     console.log(error);
//   }
// });
exports.default = router;
