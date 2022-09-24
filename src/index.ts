import mongoose from 'mongoose';
import routes from './routes';
import * as dotenv from 'dotenv';

dotenv.config();

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = process.env.MONGODB_URI as string;

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to the database 🚀');
  })
  .catch((err: any) => {
    console.error(`Error connecting to the database. n${err}`);
  });

routes(app);

console.log(`🌵🌵 Server is running on http://localhost:${port}`);
app.listen(port);
