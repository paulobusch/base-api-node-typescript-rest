import { ViewModel } from "@bases/action-view-model.interface";

export class UserList extends ViewModel<UserList> {
    public name: string;
    public email: string;
}