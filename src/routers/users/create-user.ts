import { Mutation } from "@bases/action-bases";
import { MutationResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";
import { EActionStatus } from "@enums/action-status.enum";
import { User } from "@models/users/entities/user";
import { Bcrypt } from "@hashing/bcrypt";
import { Validators } from "@metadata/validators";
import { Property } from "@decorators/property";
import validator from "validator";

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

    @Property([Validators.required, Validators.lenght({ length: 8 })])
    public id_role: string;
    
    async consistent(): Promise<MutationResult> {
        const existsName = !!await User.findOne({ where: { name: this.name } });
        if (existsName) return new MutationResult(EActionStatus.conflict, 'User with name already exists');
        const existsEmail = !!await User.findOne({ where: { email: this.email } });
        if (existsEmail) return new MutationResult(EActionStatus.conflict, 'User with email already exists');
        const existsLogin = !!await User.findOne({ where: { login: this.login } });
        if (existsLogin) return new MutationResult(EActionStatus.conflict, 'User with login already exists');
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const user = new User(this);
        user.password = await Bcrypt.encript(this.password);
        const result = await user.save();
        if (!result) return new MutationResult(EActionStatus.notAllowed);
        return new MutationResult(EActionStatus.success);
    }
}