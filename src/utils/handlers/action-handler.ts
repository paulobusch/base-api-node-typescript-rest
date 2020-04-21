import { IAction } from "@interfaces/action.interface";
import { EActionStatus } from "@enums/action-status.enum";
import { TriggerHandler } from "./trigger-handler";
import { IActionResult } from "@interfaces/action-result.interface";
import { ActionResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";
import { ValidatorHandler } from "./validator-handler";

export default class ActionHandler {
    public static async run<TResult>(action: IAction<TResult>, context: ActionContext): Promise<IActionResult<TResult>> {
        const validateResult = ValidatorHandler.validate(action);
        if (validateResult.status !== EActionStatus.success) return validateResult;
        const consistent = await action.consistent();
        if (consistent.status !== EActionStatus.success) return consistent;
        const permitted = action.permitted();
        if (!permitted) return new ActionResult(EActionStatus.unauthorized, 'No has permission to run action');
        const result = await action.execute(context);
        await TriggerHandler.runTriggers(action, result);     
        return result;
    }
}