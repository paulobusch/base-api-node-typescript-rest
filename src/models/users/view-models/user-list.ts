import { ViewModel } from "@bases/action-view-model.interface";
import { Attribute } from "@decorators/attribute";

export class UserList extends ViewModel<UserList> {
    @Attribute() public id: string;
    @Attribute() public name: string;
    @Attribute() public email: string;
}