import { Validator } from "@bases/property-validator";
import { ValidatorType } from "@enums/validator.enum";

export class RegexValidator extends Validator {
    public regex: RegExp;

    constructor(regex: RegExp) {
        super(ValidatorType.regex);
        this.regex = regex;
        if (!this.regex) 
            throw new Error('Require regex for validator');
    }

    public validate(value: any): boolean {
        if (!value) return false;
        return this.regex.test(value);
    }
}