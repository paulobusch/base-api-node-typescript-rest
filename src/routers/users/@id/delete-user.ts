import { Mutation } from "@bases/action-bases";
import { MutationResult } from "@results/action-result";
import { ActionContext } from "src/utils/metadata/action-context";

export class DeleteUser extends Mutation {
    async consistent(): Promise<MutationResult> {
        return new MutationResult(); 
    }

    async execute(context: ActionContext): Promise<MutationResult> {
        return new MutationResult();
    }
}