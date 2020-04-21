import express from 'express';
import { Shape } from './shape-type';

export class ActionContext {
    public request: express.Request;    
    public response: express.Response;
    
    constructor(data: Shape<ActionContext>) {
        Object.assign(this, data);
    }
}