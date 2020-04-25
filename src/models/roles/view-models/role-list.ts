import { ViewModel } from "@bases/action-view-model.interface";
import { Attribute } from "@decorators/attribute";

export class RoleList extends ViewModel<RoleList> {
    @Attribute() public id: string;
    @Attribute() public name: string;
    @Attribute() public users_count: number;
}