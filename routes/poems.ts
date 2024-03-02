import express, { Request, Response } from "express";
const router = express.Router();
import { db } from "../db/db";

// GET titles of all poems

// router.get("/all", async (req: Request, res: Response) => {
//   try {
//     const data = await db("titles")
//       .join("poets", "poets.id", "titles.poet_id")
//       .select(
//         "titles.id",
//         "titles.title",
//         "titles.short_title",
//         "titles.pub_year",
//         "poets.first_name",
//         "poets.last_name",
//         "pub_year"
//       )
//       .orderBy("titles.title");
//     res.json(data);
//   } catch (error) {
//     res.status(500).send("Error getting poems");
//     console.log(error);
//   }
// });

// // GET all lines of all poems

// router.get("/all/lines", async (req: Request, res: Response) => {
//   try {
//     const data = await db("poems");
//     res.status(200).json(data);
//   } catch {
//     res.status(500).send("Error getting poems");
//   }
// });

// // GET list of poems by a single poet

// router.get("/:authorName", async (req: Request, res: Response) => {
//   try {
//     const authorName = req.params.authorName;
//     const data = await db("titles")
//       .join("poets", "poets.id", "titles.poet_id")
//       .select(
//         "poets.first_name",
//         "poets.last_name",
//         "titles.id",
//         "titles.pub_year",
//         "titles.short_title",
//         "titles.title"
//       )
//       .where("poets.url_param", authorName);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).send("Error getting poems");
//     console.log(error);
//   }
// });

// // GET single Poem (data use to render lines of poem on SinglePoemPage)

// router.get("/titles/:poemTitle", async (req: Request, res: Response) => {
//   try {
//     const poemTitle = req.params.poemTitle;
//     const data = await db("poems")
//       .join("titles", "poems.title_id", "titles.id")
//       .select("poems.id", "poems.lns")
//       .where("titles.short_title", poemTitle);

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).send("Error getting poems");
//     console.log(error);
//   }
// });

// // GET poem information (data used for to render author, title, and publication date on poem page)

// router.get("/info/:poemTitle", async (req: Request, res: Response) => {
//   try {
//     const poemTitle = req.params.poemTitle;
//     const data = await db("titles")
//       .join("poets", "titles.poet_id", "poets.id")
//       .select(
//         "poets.first_name",
//         "poets.last_name",
//         "poets.url_param",
//         "titles.title",
//         "titles.pub_year"
//       )
//       .where("titles.short_title", poemTitle);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).send("Error getting poems");
//     console.log(error);
//   }
// });

// // POST new poem line

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const newPoem = await db("poems").insert(req.body);
//     res.status(201).json(req.body);
//   } catch (error) {
//     res.status(500).send("Error adding poem");
//     console.log(error);
//   }
// });

export default router;
