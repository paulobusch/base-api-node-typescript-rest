import { IAction } from "@interfaces/action.interface";
import { ActionResult } from "@results/action-result";
import { EActionStatus } from "@enums/action-status.enum";
import { Decorator } from "@decorators/property";
import { ValidatorType } from "@enums/validator.enum";

export class ValidatorHandler {
    static validate<TResult>(action: IAction<TResult>): ActionResult {
        for (let propertyKey of Decorator.getProperties(action)) {
            const value = action[propertyKey];
            const properyData = Decorator.getPropertyData(action, propertyKey);
            for (let validator of properyData.validators) {
                const valid = validator.validate(value);
                if (!valid){
                    const data = { 
                        field: propertyKey,
                        options: validator.serialize(), 
                        validator: ValidatorType[validator.type]
                    };
                    return new ActionResult(EActionStatus.notAllowed, 'Current action is not valid', data);
                }
            }
        }
        return new ActionResult(EActionStatus.success);
    }
}