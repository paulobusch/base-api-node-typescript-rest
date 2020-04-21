import { PropertyData } from "@metadata/property";
import { Validator } from "@bases/property-validator";

const actionsData: { [action: string]: PropertyData[] } = { };

export function Property(validators: Validator[]) {
    return function (action: any, propertyKey: string) {
        const actionName = action.constructor.name;
        actionsData[actionName] = actionsData[actionName] || [];
        actionsData[actionName].push(new PropertyData({ name: propertyKey, validators }));
    }
}

export class Decorator {
    static getPropertyData(entityKey: string, propertyKey: string): PropertyData {
        if (!actionsData[entityKey]) return { } as PropertyData;
        return actionsData[entityKey][propertyKey];
    }
    
    static getProperties(actionKey: string): string[] {
        if (!actionsData[actionKey]) return [];
        return actionsData[actionKey].map(m => m.name);
    }
}