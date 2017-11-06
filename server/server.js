import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import apiRoutes from './routes';

export function app () {
  const app = express();
  const indexPath = path.join(__dirname, '../client/index.html');
  const stylePath = path.join(__dirname, '../client/app.css');
  const publicPath = express.static(path.join(__dirname, '../dist'));

  app.use(logger('dev'));
  app.use(cors());
  app.use('/dist', publicPath);
  apiRoutes(app);

  app.get('/', function (_, res) { res.sendFile(indexPath) });
  app.get('/app.css', function (_, res) { res.sendFile(stylePath) });

  return app;
}
