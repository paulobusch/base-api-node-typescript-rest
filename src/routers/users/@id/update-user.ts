import { Mutation } from "@bases/action-bases";
import { MutationResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";
import { Validators } from "@metadata/validators";
import { Property } from "@decorators/property";
import { User } from "@models/users/entities/user";
import { EActionStatus } from "@enums/action-status.enum";
import { Op } from 'sequelize';

export class UpdateUser extends Mutation {
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
        const existsName = !!await User.findOne({ where: { name: this.name, id: { [Op.not]: this.id } } });
        if (existsName) return new MutationResult(EActionStatus.notAllowed, 'User with name already exists');
        const existsEmail = !!await User.findOne({ where: { email: this.email, id: { [Op.not]: this.id } } });
        if (existsEmail) return new MutationResult(EActionStatus.notAllowed, 'User with email already exists');
        const existsLogin = !!await User.findOne({ where: { login: this.login, id: { [Op.not]: this.id } } });
        if (existsLogin) return new MutationResult(EActionStatus.notAllowed, 'User with login already exists');
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const query = { where: { id: this.id } }; 
        const user = new User({ 
            id: this.id,
            name: this.name,
            cpf: this.cpf,
            email: this.email,
            login: this.login,
            birth: this.birth
        });
        const result = await user.update(query);
        if (!result) return new MutationResult(EActionStatus.notAllowed);
        return new MutationResult(EActionStatus.success);
    }
}