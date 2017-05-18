import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../share/services/validation.service';
import { UserService } from '../../share/services/user.service';
import { User } from '../../models/user';

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
  constructor(_formBuider: FormBuilder, private _userService: UserService) {
  	this.userName = new FormControl("anhnguyen", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)
    ]);
    this.email = new FormControl("anh.nguyen2@asiantech.vn", [
      Validators.required,
      ValidationService.emailValidator
    ]);
  	this.password = new FormControl("123456", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(24),
      ValidationService.passwordValidator
    ]);
    this.passwordConfirm = new FormControl("123456", [
      Validators.required,
      ValidationService.passwordConfirmValidator
    ]);
  	this.newUserForm = _formBuider.group({
  		userName: this.userName,
  		email: this.email,
  		password: this.password,
  		passwordConfirm: this.passwordConfirm
  	});
  }

  registerUser() {
    let user = new User;
    user.id = "";
    user.username = this.userName.value;
    user.email = this.email.value;
    user.password = this.password.value;
    user.fullname = "";
    user.avatar = "";
    user.birthday = "";
    user.description = "";
    this._userService.createUser(user)
    .subscribe((data: any) => {
      console.log(data);
    });
    return false;
  }
}
