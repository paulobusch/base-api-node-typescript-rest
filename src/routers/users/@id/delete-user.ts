import { Mutation } from "@bases/action-bases";
import { MutationResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";
import { Validators } from "@metadata/validators";
import { Property } from "@decorators/property";
import { User } from "@models/users/user";
import { EActionStatus } from "@enums/action-status.enum";

export class DeleteUser extends Mutation {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;

    async consistent(): Promise<MutationResult> {
        const exists = await User.findOne({ where: { id: this.id } });
        if (!exists) return new MutationResult(EActionStatus.notFound, 'User with is does not exists');
        return new MutationResult(EActionStatus.success);
    }

    async execute(context: ActionContext): Promise<MutationResult> {
        const query = { where: { id: this.id } };
        const result = await User.destroy(query);
        if (!result) return new MutationResult(EActionStatus.notAllowed); 
        return new MutationResult();
    }
}