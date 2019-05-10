import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const nameDescriptionValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const name = control.get('name');
    const description = control.get('description');

    return name && description && name.value === description.value ? { 'nameDescription': true } : null;
  };