import express, { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
const router = express.Router();
import { db } from "../db/db";

const openai = new OpenAI();

// Types

interface analysisData {
  id: number;
  analysis: string | undefined;
  short_title: string;
  title_id: number;
  title: string;
}

interface poetTitleData {
  first_name: string;
  last_name: string;
  title: string;
  id: number;
}

// Middleware

// const checkForAnalysis = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // Query the database and send back analysis
//   try {
//     const poemTitle = req.params.poemTitle;
//     const data: analysisData[] = await db("analyses")
//       .join("titles", "titles.id", "analyses.title_id")
//       .select("analyses.id", "analyses.analysis", "titles.short_title")
//       .where("titles.short_title", poemTitle);

//     // If no analysis in database, request new analysis from GPT

//     if (!data[0]) {
//       // Query the database and use params stored in `poemTitle` to get poet name, title of poem, and title id.

//       const poetTitle: poetTitleData[] = await db("titles")
//         .join("poets", "poets.id", "titles.poet_id")
//         .select(
//           "poets.first_name",
//           "poets.last_name",
//           "titles.title",
//           "titles.id"
//         )
//         .where("titles.short_title", poemTitle);
//       const poetName = `${poetTitle[0].first_name} ${poetTitle[0].last_name}`;
//       const titleOfPoem = poetTitle[0].title;
//       const titleId = poetTitle[0].id;

//       // Makes POST request to GPT to generate new analysis

//       const sendToGPT = async () => {
//         const completion = await openai.chat.completions.create({
//           model: "gpt-4",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "As an expert in poetry, your task is to provide an insightful interpretation of poem titles submitted to you. Your response should offer a concise analysis that aids readers in grasping the poem's themes and core message. Highlight key aspects to focus on, such as notable imagery, metaphors, and any lines of particular significance, offering multiple interpretations where applicable. Additionally, contextualize the poem within its historical or biographical landscape to enrich the reader's understanding. When discussing famous or complex passages, ensure your explanation is both informed by academic scholarship and presented in a manner that is engaging and accessible to a general audience. Aim for a tone that's both knowledgeable and inviting, as if you're discussing the poem with an enthusiastic friend. Please refrain from using headings in your analysis.",
//             },
//             {
//               role: "user",
//               content: `"${titleOfPoem}" by ${poetName}`,
//             },
//           ],
//           temperature: 0.7,
//         });
//         const poemAnalysis = completion.choices[0].message.content;

//         // Error handling for GPT post request

//         if (!poemAnalysis) {
//           res.status(500).send("Error generating new analysis");
//         }

//         // Posts the resulting analysis to the database

//         await db("analyses").insert({
//           title_id: `${titleId}`,
//           analysis: `${poemAnalysis}`,
//         });
//         res.status(201).send(poemAnalysis);
//       };
//       // Calling the function
//       sendToGPT();
//     } else {
//       res.status(200).json(data);
//     }
//   } catch (error) {
//     res.status(500).send("Error getting analysis");
//   }
//   next();
// };

// // GET analysis of a poem from database

// router.get("/:poemTitle", checkForAnalysis, async () => {
//   // Response is handled by middleware after it performs a check of the database
// });

export default router;
