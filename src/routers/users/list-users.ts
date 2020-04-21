import { Query } from "@bases/action-bases";
import { UserList } from "../../models/users/view-models/user-list";
import { QueryResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";

export class ListUsers extends Query<UserList[]> {
    async execute(context: ActionContext): Promise<QueryResult<UserList[]>> {
        const user = new UserList({
            name: 'Paulo Ricardo Busch',
            email: 'paulo@teste.com.br'
        });
        return new QueryResult([user]); 
    }
}