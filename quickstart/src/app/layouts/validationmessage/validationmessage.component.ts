import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../share/services/validation.service';

@Component({
  selector: 'app-messages',
  template: `<span *ngIf="errorMessage !== null">{{errorMessage}}</span>`
})

export class MessagesComponent {
  // errorMessage: string;
  @Input() control: FormControl;
  constructor() {
  }
  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
