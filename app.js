import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser'

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import connection from "./database/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
connection();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', indexRouter);
app.use('/users', usersRouter);

export default app;