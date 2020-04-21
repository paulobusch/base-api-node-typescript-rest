import { Mutation } from "@bases/action-bases";
import { MutationResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { EActionStatus } from "@enums/action-status.enum";
import { User } from "@models/users/user";

export class CreateUser extends Mutation {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;
    
    @Property([Validators.required, Validators.lenght({ max: 200 })])
    public name: string;
    
    @Property([Validators.required, Validators.lenght({ max: 11 }), Validators.regex(/[0-9]{11}/)])
    public cpf: string;
    
    @Property([Validators.required, Validators.email, Validators.lenght({ max: 200 })])
    public email: string;
    
    @Property([Validators.required, Validators.lenght({ min: 5, max: 50 })])
    public login: string;
    
    @Property([Validators.required, Validators.lenght({ min: 5, max: 50 })])
    public password: string;
    
    @Property([Validators.required])
    public birth: Date;

    async consistent(): Promise<MutationResult> {
        const existsName = !!await User.count({ where: { name: this.name } });
        if (existsName) return new MutationResult(EActionStatus.notAllowed, 'User with name already exists');
        const existsEmail = !!await User.count({ where: { email: this.email } });
        if (existsEmail) return new MutationResult(EActionStatus.notAllowed, 'User with email already exists');
        const existsLogin = !!await User.count({ where: { login: this.login } });
        if (existsLogin) return new MutationResult(EActionStatus.notAllowed, 'User with login already exists');
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        var user = new User({ 
            id: this.id,
            name: this.name,
            cpf: this.cpf,
            email: this.email,
            login: this.login,
            password: this.password,
            birth: this.birth
        });
        const result = await user.save();
        if (!result) return new MutationResult(EActionStatus.error);
        return new MutationResult(EActionStatus.success);
    }
}