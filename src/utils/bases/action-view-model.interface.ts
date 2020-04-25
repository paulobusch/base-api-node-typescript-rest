import { Shape } from "@metadata/shape-type";

export abstract class ViewModel<T> {
    constructor(data?: Shape<T>) {
        Object.assign(this, data || { });
    }
}