import { IViewModel } from '@interfaces/action-view-model.interface';
import { Shape } from '@metadata/shape-type';

export class AuthResult implements IViewModel {
    public sucess: boolean;
    public user_name: string;
    public user_email: string;

    constructor(data: Shape<AuthResult>) {
        Object.assign(this, data);
    }
}