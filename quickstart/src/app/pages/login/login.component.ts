import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../share/services/validation.service';
import { AuthenticationService } from '../../share/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginPageComponent { 
  email: FormControl;
	password: FormControl;
	loginForm: FormGroup;
	returnUrl: string;
	constructor(
		_formBuider: FormBuilder,
		private route: ActivatedRoute,
    private router: Router,
		private _authenticationService: AuthenticationService
	) {
    this.email = new FormControl("thap.spdn@gmail.com", [
      Validators.required,
      ValidationService.emailValidator
    ]);
  	this.password = new FormControl("1234567", [
      Validators.required,
      // Validators.minLength(6),
      // Validators.maxLength(24),
      // ValidationService.passwordValidator
    ]);
    this.loginForm = _formBuider.group({
  		email: this.email,
  		password: this.password,
  	});
  }
  ngOnInit() {
  	// reset login status
    this._authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
  	// this.loading = true;
    this._authenticationService.login(this.email.value, this.password.value)
    .subscribe(data => {
      this.router.navigate([this.returnUrl]);
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}
