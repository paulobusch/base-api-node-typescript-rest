import { ViewModel } from '@bases/action-view-model.interface';
import { Attribute } from '@decorators/attribute';

export class AuthResult extends ViewModel<AuthResult> {
    @Attribute() public success: boolean;
    @Attribute() public user_name: string;
    @Attribute() public user_email: string;
}