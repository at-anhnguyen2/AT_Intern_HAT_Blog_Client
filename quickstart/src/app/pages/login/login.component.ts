import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../share/services/validation.service';
import { AuthenticationService } from '../../share/services/authentication.service';
import { AppConfig } from '../../share/app.config';

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
		private _authenticationService: AuthenticationService,
    private _appConfig: AppConfig
	) {
    this.email = new FormControl("thap.spdn@gmail.com", [
      Validators.required,
      ValidationService.emailValidator
    ]);
  	this.password = new FormControl("1234567", [
      Validators.required,
    ]);
    this.loginForm = _formBuider.group({
  		email: this.email,
  		password: this.password,
  	});
  }
  ngOnInit() {
    if (this._appConfig.currentUser) {
      this.router.navigate(['/home']);
    }
  	// reset login status
    // this._authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
  	// this.loading = true;
    this._authenticationService.login(this.email.value, this.password.value)
    .subscribe((data: any) => {
      if (data) {
        this.router.navigate(['/home']);
        console.log(data);
      } else {
        alert(data);
      }
    },
    error => {
      console.log(error);
    });
  }
}
