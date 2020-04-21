import { ViewModel } from "@bases/action-view-model.interface";

export class UserDetail extends ViewModel<UserDetail> {
    public name: string;
    public email: string;
    public birth: Date;
}