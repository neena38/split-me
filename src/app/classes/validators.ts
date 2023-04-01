import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isDuplicateValidator(existingProfiles: string[]): ValidatorFn {
  return (
    control: AbstractControl
  ): {
    [key: string]: any;
  } | null =>
    !existingProfiles.includes(control.value?.toLowerCase())
      ? null
      : { duplicate: control.value };
}
