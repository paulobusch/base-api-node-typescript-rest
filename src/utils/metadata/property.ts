import { Validator } from "../decorators/validators";
import { Shape } from "src/utils/metadata/shape-type";

export class PropertyData {
    public validators: Validator[] = [];
 
    constructor(data: Shape<PropertyData>) {
        Object.assign(this, data);
    }
 }