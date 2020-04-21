import { Query } from "@bases/action-implements";
import { QueryResult } from "@results/action-result";
import { AuthResult } from "./view-models/auth-result";
import { ActionContext } from "@bases/action-context";

export default class AuthUser extends Query<AuthResult> {
    async execute(context: ActionContext): Promise<QueryResult<AuthResult>> {
        const result = new AuthResult({
            sucess: true,
            role_name: 'admin',
            user_email: 'paulo@teste.com.br',
            user_name: 'Paulo Ricardo Busch'
        });
        return new QueryResult<AuthResult>(new AuthResult(result));
    }
}