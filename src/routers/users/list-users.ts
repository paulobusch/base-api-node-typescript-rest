import { Query } from "@bases/action-bases";
import { UserList } from "../../models/users/view-models/user-list";
import { QueryResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";
import { User } from "@models/users/user";
import { QueryPaginated } from "@results/action-paginated";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { Op } from "sequelize";

export class ListUsers extends Query<QueryPaginated<UserList>> {
    
    @Property([Validators.range({ min: 0 })])
    public page: number = 0;
    
    @Property([Validators.range({ min: 0, max: 100 })])
    public limit: number = 100;
    
    public search: string;

    async execute(context: ActionContext): Promise<QueryResult<QueryPaginated<UserList>>> {
        const query = {
            raw: true,
            attributes: ['name', 'email'],
            where: { },
            limit: this.limit,
            offset: this.page * this.limit
        };
        
        if (this.search) {
            const searchLike = `${this.search}%`;
            query.where[Op.or] = [
                { name: { [Op.like]: searchLike } },
                { email: { [Op.like]: searchLike } },
                { login: { [Op.like]: searchLike } }
            ];
        }

        const users = await User.findAndCountAll(query);
        const vmUsers = users.rows.map(u => new UserList(u));
        return new QueryResult(new QueryPaginated(users.count, vmUsers));
    }
}