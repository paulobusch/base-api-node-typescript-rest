import { ValidatorType } from "@enums/validator.enum";
import { Shape } from "../metadata/shape-type";
import { LengthOptions, LengthValidator } from "./lenght";
import { Validator } from "@bases/property-validator";

export class Validators extends Va {

    static get required(): Validator {
        return new Validator(
            ValidatorType.required,
            function (value: string) { return !!value; }
        );
    }

    static get email(): Validator {
        return new Validator(
            ValidatorType.email,
            Validator.regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).call
        );
    }

    static lenght(options: Shape<LengthOptions>): Validator {
        return new LengthValidator(options);
    }

    static regex(regex: RegExp): Validator {
        if (!regex)
            throw new Error('Require regex for validator');
        return new Validator(
            ValidatorType.regex,
            function(value: string) {
                if (!value) return false;
                return regex.test(value);
            }
        );
    }
}