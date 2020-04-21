import { Mutation } from "@bases/action-bases";
import { MutationResult } from "@results/action-result";
import { ActionContext } from "src/utils/metadata/action-context";

export class CreateUser extends Mutation {
    async consistent(): Promise<MutationResult> {
        console.log('consistent');
        return new MutationResult();
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        console.log('execute');
        return new MutationResult();
    }
}