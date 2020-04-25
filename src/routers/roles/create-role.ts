import { Mutation } from "@bases/action-bases";
import { ActionContext } from "@metadata/action-context";
import { MutationResult } from "@results/action-result";
import { EActionStatus } from "@enums/action-status.enum";
import { EFunctionality } from "@models/roles/enums/functionalities";
import { Role } from "@models/roles/entities/role";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { Functionality } from "@models/roles/entities/functionality";
import { Transaction } from "sequelize/types";

export class CreateRole extends Mutation {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;
    
    @Property([Validators.required, Validators.lenght({ max: 150 })])
    public name: string;
    
    @Property([Validators.required])
    public functionalities: EFunctionality[];

    async consistent(): Promise<MutationResult> {
        const existsName = await Role.findOne({ where: { name: this.name } });
        if (existsName) return new MutationResult(EActionStatus.conflict, 'Role with name already exists');
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const role = new Role(this);
        const functionalities = this.functionalities.map(f => new Functionality({ id_role: this.id, id: f }));
        return await context.transaction(async (transaction: Transaction) => {
            await role.save({ transaction });
            await role.$add('functionalities', functionalities, { transaction });
        });
    }
}