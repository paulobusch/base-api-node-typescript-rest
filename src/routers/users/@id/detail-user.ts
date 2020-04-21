import { UserDetail } from "../../../models/users/view-models/user-detail";
import { Query } from "@bases/action-bases";
import { ActionContext } from "@metadata/action-context";
import { QueryResult } from "@results/action-result";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";

export class DetailUser extends Query<UserDetail> {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;

    async execute(context: ActionContext): Promise<QueryResult<UserDetail>> {
        const user = new UserDetail({
            name: 'Paulo Ricardo Busch',
            email: 'teste@teste.com.br',
            birth: new Date()
        });

        return new QueryResult(user);
    }
}