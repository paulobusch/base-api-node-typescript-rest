import { Mutation } from "@bases/action-bases";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { MutationResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";
import { Role } from "@models/roles/entities/role";
import { EActionStatus } from "@enums/action-status.enum";

export class DeleteRole extends Mutation {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;

    async consistent(): Promise<MutationResult> {
        const exists = await Role.findOne({ where: { id: this.id } });
        if (!exists) return new MutationResult(EActionStatus.notFound, 'Role with id does not exists');
        return new MutationResult(EActionStatus.notFound);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const query = { where: { id: this.id } };
        const result = await Role.destroy(query);
        if (!result) return new MutationResult(EActionStatus.error);
        return new MutationResult(EActionStatus.success);
    }
}