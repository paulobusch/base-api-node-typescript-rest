import express from 'express';
import { Shape } from './shape-type';
import { Sequelize, Transaction } from 'sequelize/types';
import { MutationResult, ActionResult } from '@results/action-result';
import { EActionStatus } from '@enums/action-status.enum';

export class ActionContext {
    public db: Sequelize;
    public request: express.Request;    
    public response: express.Response;
    
    public async transaction(call: (transaction: Transaction) => {}): Promise<ActionResult> {
        let transaction = await this.db.transaction({ autocommit: false });
        try {
            await call(transaction);
            await transaction.commit();
            return new ActionResult(EActionStatus.success);
        }catch(err) {
            await transaction.rollback();
        }
        return new ActionResult(EActionStatus.error);
    }

    constructor(data: any) {
        Object.assign(this, data);
    }
}