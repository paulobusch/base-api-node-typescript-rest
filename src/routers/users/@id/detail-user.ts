import { UserDetail } from "./view-models/user-detail";
import { Query } from "@bases/action-bases";
import { ActionContext } from "src/utils/metadata/action-context";
import { QueryResult } from "@results/action-result";

export class DetailUser extends Query<UserDetail> {
    async execute(context: ActionContext): Promise<QueryResult<UserDetail>> {
        const user = new UserDetail({
            name: 'Paulo Ricardo Busch',
            email: 'teste@teste.com.br',
            birth: new Date()
        });

        return new QueryResult(user);
    }
}