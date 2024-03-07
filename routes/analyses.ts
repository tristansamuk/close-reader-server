import express, { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
const router = express.Router();
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { analyses, titles, poets } from "../db/schema";

const apiKey = process.env.API_KEY;
const openai = new OpenAI({ apiKey: apiKey });

// Middleware

const checkForAnalysis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // GET request to database to check for pre-existing analysis
  try {
    const poemTitle = req.params.poemTitle;
    const data = await db
      .select({
        id: analyses.id,
        analysis: analyses.analysis,
        shortTitle: titles.shortTitle,
      })
      .from(analyses)
      .innerJoin(titles, eq(titles.id, analyses.titleID))
      .where(eq(titles.shortTitle, poemTitle));

    // If no analysis in database, request new analysis from GPT

    if (!data[0]) {
      // GET request to database using params stored in `poemTitle` to get poet name, title of poem, and title id

      const poetTitle = await db
        .select({
          id: poets.id,
          firstName: poets.firstName,
          lastName: poets.lastName,
          title: titles.title,
          titleId: titles.id,
        })
        .from(poets)
        .innerJoin(titles, eq(titles.poetID, poets.id))
        .where(eq(titles.shortTitle, poemTitle));

      const poetName = `${poetTitle[0].firstName} ${poetTitle[0].lastName}`;
      const titleOfPoem = poetTitle[0].title;
      const titleId = poetTitle[0].titleId;

      // Makes POST request to GPT to generate new analysis

      const sendToGPT = async () => {
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "As an expert in poetry, your task is to provide an insightful interpretation of poem titles submitted to you. Your response should offer a concise analysis that aids readers in grasping the poem's themes and core message. Highlight key aspects to focus on, such as notable imagery, metaphors, and any lines of particular significance, offering multiple interpretations where applicable. Additionally, contextualize the poem within its historical or biographical landscape to enrich the reader's understanding. When discussing famous or complex passages, ensure your explanation is both informed by academic scholarship and presented in a manner that is engaging and accessible to a general audience. Aim for a tone that's both knowledgeable and inviting, as if you're discussing the poem with an enthusiastic friend. Please refrain from using headings in your analysis.",
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

        await db.insert(analyses).values({
          titleID: Number(`${titleId}`),
          analysis: `${poemAnalysis}`,
        });
        res.status(201).send(poemAnalysis);
      };
      // Calling the function
      sendToGPT();
    } else {
      res.status(200).json(data[0].analysis);
    }
  } catch (error) {
    res.status(500).send("Error getting analysis");
    console.log(error);
  }
  next();
};

// GET analysis of a poem from database

router.get("/:poemTitle", checkForAnalysis, async () => {
  // Response is handled by middleware after it performs a check of the database
});

export default router;
