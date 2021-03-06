import { Query } from "@bases/action-bases";
import { QueryResult } from "@results/action-result";
import { AuthResult } from "../../models/users/view-models/auth-result";
import { ActionContext } from "@metadata/action-context";

export default class AuthUser extends Query<AuthResult> {
    async execute(context: ActionContext): Promise<QueryResult<AuthResult>> {
        const result = new AuthResult({
            success: true,
            user_email: 'paulo@teste.com.br',
            user_name: 'Paulo Ricardo Busch'
        });
        return new QueryResult<AuthResult>(new AuthResult(result));
    }
}