import express from 'express';
import { config } from 'dotenv';
import { OpenAI } from "openai";

config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

const app = express();
const port = 3000;

app.use(express.json());

const role = 'system';
const model = 'gpt-3.5-turbo';
const content = 'How to you say My name is Ayaz in spanish?';

app.post('/generate-text', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (typeof prompt !== 'string') {
      res.status(400).send('Invalid prompt provided');
      return;
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role, content }],
      model,
    });
    res.send(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error in POST /generate-text:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
