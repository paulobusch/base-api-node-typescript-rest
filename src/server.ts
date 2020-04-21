import 'module-alias/register';
import auth from './filters/auth';
import express from 'express';
import settings from '@settings';
import ActionHandler from '@handlers/action-handler';
import { RestPath } from 'rest';
import { ActionContext } from '@bases/action-context';
import { UrlParser } from '@routers/extract-params';
declare var __dirname;
const app = express();

RestPath.setConfig(settings.rest, __dirname);
for (let router of RestPath.getRouters()) {
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
    res.send(RestPath.compile());
});

app.listen(3000, () => { console.log('Runing server on port: 3000'); });