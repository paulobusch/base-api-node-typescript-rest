import { Model } from "sequelize-typescript";

export class ActionModel {
    static getOne<T extends Model>(model: T | null): T | null {
        if (!model) return null;
        return model.get({ plain: true }) as T;
    }
    static getList<T extends Model>(list: T[]): T[] {
        if (!list || list.length === 0) return [];
        return list.map(l => ActionModel.getOne(l)) as T[];
    }
}