import { Mutation } from "@bases/action-bases";
import { MutationResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";

export class UpdateUser extends Mutation {
    async consistent(): Promise<MutationResult> {
        console.log('consistent');
        return new MutationResult();
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        console.log('execute');
        return new MutationResult();
    }
}