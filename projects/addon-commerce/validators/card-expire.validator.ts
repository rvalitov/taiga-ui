import {AbstractControl, ValidationErrors} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';
import {isExpireValid} from '../utils/is-expire-valid';

export function tuiCardExpireValidator({
    value,
}: AbstractControl): ValidationErrors | null {
    return value?.expire?.length === 5 && !isExpireValid(value?.expire)
        ? {expire: new TuiValidationError('Expire date')}
        : null;
}
