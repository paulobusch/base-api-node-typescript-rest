import { Mutation } from "@bases/action-bases";
import { Validators } from "@metadata/validators";
import { Property } from "@decorators/property";
import { EFunctionality } from "@models/roles/enums/functionalities";
import { MutationResult } from "@results/action-result";
import { EActionStatus } from "@enums/action-status.enum";
import { Role } from "@models/roles/entities/role";
import { Op, Transaction } from 'sequelize'; 
import { ActionContext } from "@metadata/action-context";
import { Functionality } from "@models/roles/entities/functionality";

export class UpdateRole extends Mutation {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;
    
    @Property([Validators.required, Validators.lenght({ max: 150 })])
    public name: string;
    
    @Property([Validators.required])
    public functionalities: EFunctionality[];
    
    async consistent(): Promise<MutationResult> {
        const existsName = await Role.findOne({ where: { name: this.name, id: { [Op.not]: this.id } } });
        if (existsName) return new MutationResult(EActionStatus.conflict, 'Role with name already exists');
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const query = { where: { id: this.id } };
        const role = await Role.findOne(query);
        if (!role) return new MutationResult(EActionStatus.notFound, 'Role with does not exists');
        return await context.transaction(async (transaction: Transaction) => {
            await role.update(this, { transaction });
            await role.$set('functionalities', this.functionalities.map(f => new Functionality({ id: f })), { transaction });
        });
    }
}