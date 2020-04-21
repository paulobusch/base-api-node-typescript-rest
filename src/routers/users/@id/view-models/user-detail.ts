import { IViewModel } from "@interfaces/action-view-model.interface";
import { Shape } from "src/utils/metadata/shape-type";

export class UserDetail implements IViewModel {
    public name: string;
    public email: string;
    public birth: Date;

    constructor(data: Shape<UserDetail>) {
        Object.assign(this, data);
    }
}