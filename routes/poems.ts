import express, { Request, Response } from "express";
const router = express.Router();
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { poets, titles, poems } from "../db/schema";

// GET titles of all poems

router.get("/all", async (req: Request, res: Response) => {
  try {
    const data = await db
      .select({
        id: titles.id,
        title: titles.title,
        shortTitle: titles.shortTitle,
        pubYear: titles.pubYear,
        firstName: poets.firstName,
        lastName: poets.lastName,
      })
      .from(titles)
      .innerJoin(poets, eq(poets.id, titles.poetID))
      .orderBy(titles.title);
    res.json(data);
  } catch (error) {
    res.status(500).send("Error getting poem titles");
    console.log(error);
  }
});

// // GET list of poems by a single poet

router.get("/:poetName", async (req: Request, res: Response) => {
  try {
    const poetName = req.params.poetName;
    const data = await db
      .select({
        title: titles.title,
        firstName: poets.firstName,
        lastName: poets.lastName,
        urlParam: poets.urlParam,
        titleId: titles.id,
        pubYear: titles.pubYear,
        shortTitle: titles.shortTitle,
      })
      .from(titles)
      .innerJoin(poets, eq(poets.id, titles.poetID))
      .where(eq(poets.urlParam, poetName));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error getting poems");
    console.log(error);
  }
});

// // GET single Poem (data use to render lines of poem on SinglePoemPage)

router.get("/titles/:poemTitle", async (req: Request, res: Response) => {
  try {
    const poemTitle = req.params.poemTitle;
    const data = await db
      .select({
        id: poems.id,
        lines: poems.lines,
        shortTitle: titles.shortTitle,
      })
      .from(poems)
      .innerJoin(titles, eq(poems.titleId, titles.id))
      .where(eq(titles.shortTitle, poemTitle));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error getting poems");
    console.log(error);
  }
});

// // GET poem information (data used to render author, title, and publication date on poem page)

router.get("/info/:poemTitle", async (req: Request, res: Response) => {
  try {
    const poemTitle = req.params.poemTitle;
    const data = await db
      .select({
        firstName: poets.firstName,
        lastName: poets.lastName,
        urlParam: poets.urlParam,
        title: titles.title,
        pubYear: titles.pubYear,
      })
      .from(titles)
      .innerJoin(poets, eq(titles.poetID, poets.id))
      .where(eq(titles.shortTitle, poemTitle));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error getting poems");
    console.log(error);
  }
});

export default router;
