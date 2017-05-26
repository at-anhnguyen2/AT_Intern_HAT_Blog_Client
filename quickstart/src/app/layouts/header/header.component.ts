import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../share/services/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderLayoutComponent {
	isLogined: boolean;
	currentPage: string;
	currentUser: any;
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {
  	this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  	if (this.currentUser && this.currentUser.access_token) {
  		this.isLogined = true;
  	} else {
  		this.isLogined = false;
  	}
  }

  logout() {
    console.log(1);
    this._authenticationService.logout();
  }
}
