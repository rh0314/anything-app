import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function getUsPhoneValidator(): ValidatorFn {
  return function usPhoneValidator(control: AbstractControl) {
    const pattern = /\(?(\d\d\d)\)?[\-\. ]?(\d\d\d)[\-\. ]?(\d\d\d\d)/;
    const m = control.value.match(pattern);
    if (m && m.length === 4) {
      return null;
    }
    else {
      return { invalidPhoneNumber: true };
    }
  };
}

export function getFieldRequiredUnlessSecondFieldTrue(requiredFieldControl: AbstractControl, unlessTrueFieldControl: AbstractControl): ValidatorFn {
  return function (fg: FormGroup): ValidationErrors | null {
    if (!fg && fg.controls) { return null; }
    const requiredFieldValue = requiredFieldControl.value;
    const unlessTrueFieldControlValue = unlessTrueFieldControl.value;
    return (!!requiredFieldValue || unlessTrueFieldControlValue) ? null : { valueOfRequiredField: requiredFieldValue, valueOfUnlessTrueField: unlessTrueFieldControlValue};
  }
}

export function getDividerCanOnlyHaveDividerValidator(): ValidatorFn {
  return function (fg: FormGroup): ValidationErrors | null {
    const divider = fg.controls['divider'].value;
    const err = { isDividerButHasOtherValues: true };
    let hasOtherValues = false;
    if (divider && fg.controls) {
      Object.keys(fg.controls).forEach(key => {
        if (key === 'divider' || key === 'id') { return; }
        if (fg.controls[key].value) {
          fg.controls[key].setErrors(err);
          hasOtherValues = true;
        }
      });
    }
    return hasOtherValues ? err : null;
  }
}

export function getSubheaderOnlyHasTitleValidator(): ValidatorFn {
  return function(fg: FormGroup): ValidationErrors | null {
    const subheader = fg.controls['subheader'].value;
    const path = fg.controls['path'].value;
    const activeIdPattern = fg.controls['activeIdPattern'].value;
    let error = null;

    if (subheader) {
      if (path) {
        fg.controls['path'].setErrors({ subheaderShouldOnlyHaveTitle: true });
        error = { subheaderShouldNotHavePath: true };
      }
      if (activeIdPattern) {
        fg.controls['activeIdPattern'].setErrors({ subheaderShouldOnlyHaveTitle: true });
        error = { subheaderShouldNotHaveActiveIdPattern: true };
      }
    }
    return error;
  }
}

// if title, but no subheader, must have path & pattern

// if path, but no title or pattern, not valid.

// if pattern, but no title or path, not valid.

// can't be both divider and subheader
export function getCannotBeDividerAndSubheader(): ValidatorFn {
  return function(fg: FormGroup): ValidationErrors | null {
    const subheader = fg.controls['subheader'].value;
    const divider = fg.controls['divider'].value;

    if (subheader && divider) {
      return { cannotBeDividerAndSubheader: true };
    }
    return null;
  }
}


