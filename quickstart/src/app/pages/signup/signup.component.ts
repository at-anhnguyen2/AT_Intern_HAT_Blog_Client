import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../share/services/validation.service';
import { APIService } from '../../share/services/api.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignUpPageComponent  {
	newUserForm: FormGroup;
	userName: FormControl;
	email: FormControl;
	password: FormControl;
	passwordConfirm: FormControl;
  constructor(_formBuider: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: APIService
  ) {
    window.scrollTo(0, 0)
  	this.userName = new FormControl("anhnguyen", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)
    ]);
    this.email = new FormControl("anh.nguyen2@asiantech.vn", [
      Validators.required,
      ValidationService.emailValidator
    ]);
  	this.password = new FormControl("abcd1234", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(24),
      ValidationService.passwordValidator
    ]);
    this.passwordConfirm = new FormControl("abcd1234", [
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
    user.password_confirmation = this.passwordConfirm.value;
    user.fullname = "";
    user.avatar = "";
    user.birthday = "";
    user.description = "";
    this._apiService.createUser(user)
    .subscribe(
      (data: any) => {
        if (data && data.user) {
          let user = data.user;
          if (user && user.access_token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          this._router.navigate(['/welcome']);
        } else {
          alert('email or username have been taken')
        }
      },
      (error: any) => {
        alert(error.statusText + ': Email or Username have been taken')
      })
    return false;
  }
}
