import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import teamRouter from './routes/teams';
import connection from './db/connection';

// intialize the .env file
dotenv.config();

const app = express();

// make connection to nedb and populate football data
connection.getCon();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '/logs.log'), {flags: 'a'});
//
app.use(logger('dev', {stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// serve static contents
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

/**
 * Router to handle all the request related to the Football team data
 * Allows to Get, create and update the teams
*/
app.use('/teams', teamRouter);


export default app;
