import { IViewModel } from "@interfaces/action-view-model.interface";

export class QueryPaginated<TRestul extends IViewModel> {
    total: number;
    rows: TRestul
}