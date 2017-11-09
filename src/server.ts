import {enableProdMode} from '@angular/core';
import {ngExpressEngine} from '@nguniversal/express-engine';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import {join} from 'path';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';

enableProdMode();

const app: express.Application = express();
const staticPath: string = join(__dirname, '../www');
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('../../dist/bin/app');
const port: number = 4000;

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');

app.set('views', staticPath);

app.get('*.*', express.static(staticPath, {
  index: false
}));

app.get('*', (req: express.Request, res: express.Response) => res.render('index', {
  req
}));

app.listen(port, () => console.log(`Node Express server listening on http://localhost:${port}`));
