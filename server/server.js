import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import apiRoutes from './routes';
// const moment = require('moment');

export function app () {
  const app = express();
  const indexPath = path.join(__dirname, '../index.html');
  const stylePath = path.join(__dirname, '../index.css');
  const publicPath = express.static(path.join(__dirname, '../dist'));

  app.use(logger('dev'));
  // app.use(cors());
  app.use('/dist', publicPath);
  apiRoutes(app);

  // app.get('/', function (_, res) { res.sendFile(indexPath) });
  // app.get('/index.css', function (_, res) { res.sendFile(stylePath) });

  return app;
}
