import {AbstractControl, ValidationErrors} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';
import {isCardNumberValid} from '../utils/is-card-number-valid';

export function tuiCardNumberValidator({
    value,
}: AbstractControl): ValidationErrors | null {
    return value?.card && !isCardNumberValid(value.card)
        ? {card: new TuiValidationError('Invalid card number')}
        : null;
}
