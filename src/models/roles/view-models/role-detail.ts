import { ViewModel } from "@bases/action-view-model.interface"
import { EFunctionality } from "../enums/functionalities";
import { Attribute } from "@decorators/attribute";

export class RoleDetail extends ViewModel<RoleDetail> {
    @Attribute() public id: string;
    @Attribute() public name: string;
    public functionalities: EFunctionality[];
}