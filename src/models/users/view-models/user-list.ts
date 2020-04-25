import { Attribute } from "@decorators/attribute";
import { IViewModel } from "@interfaces/action-view-model.interface";
import { User } from "../entities/user";
import { Converter } from "@metadata/converter";

export class UserList implements IViewModel {
    @Attribute() public id: string;
    @Attribute() public name: string;
    @Attribute() public email: string;

    static map(model: User): UserList {
        const user = model.get({ plain: true });
        return Converter.assign(new UserList(), user);
    }
}