import { EFunctionality } from "../enums/functionalities";
import { Attribute } from "@decorators/attribute";
import { Role } from "../entities/role";
import { Converter } from "@metadata/converter";
import { IViewModel } from "@interfaces/action-view-model.interface";

export class RoleDetail implements IViewModel {
    @Attribute() public id: string;
    @Attribute() public name: string;
    public functionalities: EFunctionality[];

    static map(model: Role): RoleDetail {
        const role = model.get({ plain: true }) as Role;
        return {
            id: role.id, 
            name: role.name,
            functionalities: role.functionalities.map(m => m.id as EFunctionality)
        } as RoleDetail;
    }
}