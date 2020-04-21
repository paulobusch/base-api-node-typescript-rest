import { IViewModel } from "@interfaces/action-view-model.interface";
import { Shape } from "@bases/shape-type";

export class UserList implements IViewModel {
    public name: string;
    public email: string;

    constructor(data: Shape<UserList>) {
        Object.assign(this, data);
    }
}