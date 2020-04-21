import { ViewModel } from '@bases/action-view-model.interface';

export class AuthResult extends ViewModel<AuthResult> {
    public sucess: boolean;
    public user_name: string;
    public user_email: string;
}