import express, { Request, Response } from "express";
const router = express.Router();
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { poets, titles, poems } from "../db/schema";

// GET all poets

router.get("/", async (_req: Request, res: Response) => {
  try {
    const data = await db
      .select({
        id: poets.id,
        firstName: poets.firstName,
        lastName: poets.lastName,
        img: poets.img,
        urlParam: poets.urlParam,
      })
      .from(poets)
      .orderBy(poets.lastName);
    res.status(200).json(data);
  } catch {
    res.status(500).send("Error getting poets");
  }
});

// GET single poet information

router.get("/:name", async (req: Request, res: Response) => {
  try {
    const poetName = req.params.name;
    const data = await db
      .select()
      .from(poets)
      .where(eq(poets.urlParam, poetName));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error getting poet information");
    console.log(error);
  }
});

export default router;
