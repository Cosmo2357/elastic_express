import express, { NextFunction, Request, Response } from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import http from 'http';
import { HttpError } from './src/helper/HttpError';
import * as Router from './src/router';
import { OpenAIEmbeddings } from "@langchain/openai";

dotenv.config();
const openAIApiKey = process.env.OPEN_AI_API
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: openAIApiKey
});

const app: express.Express = express()
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 8080
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const v1 = "/api/v1"

app.use(cors({
  origin: frontendUrl,
  credentials: true
}))
app.use(cookieParser());
app.use(express.json())


app.get(`/`, async (req, res) => {
  const text = 'hello world 123'
  try {
    res.send({ success: true, message: 'Message and vector saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'An error occurred.' });
  }

})

app.use(`${v1}/`,/* middleware */Router.mainRoutes);

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    console.log(err.message);
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})


