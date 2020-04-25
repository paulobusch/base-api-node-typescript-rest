import { Attribute } from '@decorators/attribute';
import { Converter } from '@metadata/converter';
import { IViewModel } from '@interfaces/action-view-model.interface';

export class AuthResult implements IViewModel {
    @Attribute() public success: boolean;
    @Attribute() public user_name: string;
    @Attribute() public user_email: string;

    constructor(data: {
        success: boolean,
        user_name: string,
        user_email: string
    }) {
        Converter.assign(this, data);
    }
}