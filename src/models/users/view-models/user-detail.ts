import { Attribute } from "@decorators/attribute";
import { IViewModel } from "@interfaces/action-view-model.interface";
import { User } from "../entities/user";
import { Converter } from "@metadata/converter";

export class UserDetail implements IViewModel {
    @Attribute() public name: string;
    @Attribute() public email: string;
    @Attribute() public birth: Date;

    static map(model: User): UserDetail {
        const user = model.get({ plain: true });
        return Converter.assign(new UserDetail(), user);
    }
}