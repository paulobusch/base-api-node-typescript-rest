import { UserDetail } from "../../../models/users/view-models/user-detail";
import { Query } from "@bases/action-bases";
import { ActionContext } from "@metadata/action-context";
import { QueryResult } from "@results/action-result";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { EActionStatus } from "@enums/action-status.enum";
import { User } from "@models/users/user";
import { DecoratorAttribute } from "@decorators/attribute";

export class DetailUser extends Query<UserDetail> {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;

    async execute(context: ActionContext): Promise<QueryResult<UserDetail>> {
        const attributes = DecoratorAttribute.getAttributes(UserDetail);
        const query = { 
            raw: true, 
            attributes, 
            where: { id: this.id } 
        };
        const user = await User.findOne(query);
        if (!user) return new QueryResult({ } as any, EActionStatus.notFound);
        return new QueryResult(new UserDetail(user as any));
    }
}