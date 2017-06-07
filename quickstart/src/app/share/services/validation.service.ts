import { Injectable } from '@angular/core';

@Injectable()

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidEmailAddress': 'Incorrect format email address',
      'invalidPassword': 'Invalid password, must contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'maxlength': `Maximum length ${validatorValue.requiredLength}`,
      'invalidPasswordConfirm': `Password confirm does not match`
    };
    return config[validatorName];
  }
  static emailValidator(control: any) {
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }
  static passwordValidator(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
  static passwordConfirmValidator(control: any) {
    if (control.parent) {
      if (control.value === control.parent.value.password) {
        return null;
      } else {
        return { 'invalidPasswordConfirm': true };
      }
    }
  }
}
