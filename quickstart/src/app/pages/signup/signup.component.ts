import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html'
})

export class SignUpPageComponent  {
	newUserForm: FormGroup;
	userName: FormControl;
	email: FormControl;
	password: FormControl;
	passwordConfirm: FormControl;
  constructor(_formBuider: FormBuilder) {
  	this.userName = new FormControl("", Validators.required);
  	this.email = new FormControl("", Validators.required);
  	this.password = new FormControl("", Validators.required);
  	this.passwordConfirm = new FormControl("", Validators.required);
  	this.newUserForm = _formBuider.group({
  		userName: this.userName,
  		email: this.email,
  		password: this.passwordConfirm,
  		passwordConfirm: this.passwordConfirm
  	});
  }
}
