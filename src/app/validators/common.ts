import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const valid = /^[A-Za-z ]+$/.test(control.value);
  return valid ? null : { invalidName: true };
}

export function priceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const valid =
    /^[0-9]+(\.[0-9]{1,2})?$/.test(control.value) &&
    control.value >= 0.01 &&
    control.value <= 10.0;
  return valid ? null : { invalidPrice: true };
}

export function quantityValidator(
  control: AbstractControl
): ValidationErrors | null {
  const valid = control.value >= 1 && control.value <= 10;
  return valid ? null : { invalidQuantity: true };
}
