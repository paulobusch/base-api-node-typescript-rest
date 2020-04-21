import 'module-alias/register';
import dotenv from 'dotenv'; dotenv.config();
import cors from 'cors';
import auth from './filters/auth';
import express from 'express';
import settings from '@settings';
import ActionHandler from '@handlers/action-handler';
import { RestTree } from 'rest-tree-directorty';
import { ActionContext } from '@metadata/action-context';
import { UrlParser } from '@routers/extract-params';
import { Db } from './database';

declare var __dirname;
const app = express();

app.use(express.json()) 
app.use(cors())

Db.sync({ logging: false }).then(() => {
    console.log('Database Synchronized');
});

RestTree.setConfig(settings.rest);
for (let router of RestTree.getRouters(__dirname)) {
    app[router.method](router.path, auth, async (request, response) => {
        if (!router.module || !Object.keys(router.module).length) 
            throw new Error('Require implements class');
        const className = Object.keys(router.module)[0];
        let action = new router.module[className]();
        Object.assign(action, UrlParser.getQueryParams(request.url));
        Object.assign(action, UrlParser.getDataParams(request.url, router.path));
        Object.assign(action, request.body);
        const context = new ActionContext({ request, response });
        const result = await ActionHandler.run(action, context);
        response.status(result.status);
        response.json(result.serialize());
    });
}

app.get('/', (req, res) => {
    res.send(RestTree.compile(__dirname));
});

app.listen(3000, () => { console.log('Runing server on port: 3000'); });