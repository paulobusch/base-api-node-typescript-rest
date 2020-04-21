import { ValidatorType } from "@enums/validator.enum"
import { Shape } from "../metadata/shape-type";

export abstract class Validator {
    public options?: any;
    public type: ValidatorType;
    public abstract validate(value: any): boolean; 
    
    constructor(type: ValidatorType) {
        this.type = type;
    }
}