import { Query } from "@bases/action-bases";
import { ActionContext } from "@metadata/action-context";
import { QueryResult } from "@results/action-result";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { DecoratorAttribute } from "@decorators/attribute";
import { RoleDetail } from "@models/roles/view-models/role-detail";
import { Functionality } from "@models/roles/entities/functionality";
import { Role } from "@models/roles/entities/role";
import { EActionStatus } from "@enums/action-status.enum";

export class DetailRole extends Query<RoleDetail> {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;

    async execute(context: ActionContext): Promise<QueryResult<RoleDetail>> {
        const attributes = DecoratorAttribute.getAttributes(RoleDetail);
        const query = {
            attributes,
            include: [{
                attributes: ['id'],
                model: Functionality,
                through: { attributes: [] }
            }]
        };
        const role = await Role.findOne(query);
        if (!role) return new QueryResult({} as any, EActionStatus.notFound);
        return new QueryResult(RoleDetail.map(role));
    }
}