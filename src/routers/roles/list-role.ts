import { RoleList } from "@models/roles/view-models/role-list";
import { Query } from "@bases/action-bases";
import { ActionContext } from "@metadata/action-context";
import { QueryResult } from "@results/action-result";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { Op, Sequelize } from "sequelize";
import { Role } from "@models/roles/entities/role";
import { QueryPaginated } from "@results/action-paginated";
import { User } from "@models/users/entities/user";
import * as _ from 'lodash';

export class ListRole extends Query<QueryPaginated<RoleList>> {
    @Property([Validators.range({ min: 0 })])
    public page: number = 0;

    @Property([Validators.range({ min: 1, max: 100 })])
    public limit: number = 10;

    public search: string;

    async execute(context: ActionContext): Promise<QueryResult<QueryPaginated<RoleList>>> {
        const query = {
            attributes: ['id', 'name', [Sequelize.fn('count', 'user.id'), 'users_count']],
            where: { },
            offset: this.page * this.limit,
            limit: this.limit,
            include: [{
                attributes: ['id'],
                model: User
            }],
            group: ['role.id']
        } as any;

        if (this.search) query.where.name = { [Op.like]: `${this.search}%` };
        const result = await Role.findAndCountAll(query);
        const roles = result.rows.map(r => RoleList.map(r));
        const total = _.sum((result.count as any).map(t => t.count));
        return new QueryResult(new QueryPaginated(total, roles));
    }
}