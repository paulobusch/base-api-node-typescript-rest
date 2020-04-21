import { ITrigger } from "@interfaces/trigger.interface";
import { ETrigger } from "@enums/trigger.enum";
import { IAction } from "@interfaces/action.interface";
import { ActionResult } from "@results/action-result";

export class TriggerHandler {
    private static triggers: ITrigger[];

    public static getTriggers(triggers: ETrigger[]): ITrigger[] {
        return this.triggers.filter(t => triggers.indexOf(t.trigger()) !== -1);
    }

    public static async runTriggers<TResult>(action: IAction<TResult>, result: ActionResult) {
        if (!action || !action.triggers().length) return;
        for (let trigger of TriggerHandler.getTriggers(action.triggers())) {
            await trigger.execute(action, result);
        }
    }
}