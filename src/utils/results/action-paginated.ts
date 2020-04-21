import { ViewModel } from "@bases/action-view-model.interface";

export class QueryPaginated<TRestul extends ViewModel<TRestul>> {
    constructor(
        public total: number,
        public rows: TRestul[]
    ) { }
}