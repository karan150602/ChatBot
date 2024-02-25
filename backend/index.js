import OpenAI from "openai";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(cors());

//AI Integration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/", async (req, res) => {
  const { chats } = req.body;

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a WahlaGPT. You can help with graphic design tasks",
      },
      ...chats,
    ],
  });

  res.json({
    output: result.choices[0].message,
  });
});

//Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
