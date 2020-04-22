import { ViewModel } from "@bases/action-view-model.interface";
import { Attribute } from "@decorators/attribute";

export class UserDetail extends ViewModel<UserDetail> {
    @Attribute() public name: string;
    @Attribute() public email: string;
    @Attribute() public birth: Date;
}