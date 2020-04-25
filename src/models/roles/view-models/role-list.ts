import { Attribute } from "@decorators/attribute";
import { IViewModel } from "@interfaces/action-view-model.interface";
import { Role } from "../entities/role";
import { Converter } from "@metadata/converter";

export class RoleList implements IViewModel {
    @Attribute() public id: string;
    @Attribute() public name: string;
    @Attribute() public users_count: number;

    static map(model: Role): RoleList {
        const role = model.get({ plain: true }) as any;
        return Converter.assign(new RoleList(), role);
    }
}