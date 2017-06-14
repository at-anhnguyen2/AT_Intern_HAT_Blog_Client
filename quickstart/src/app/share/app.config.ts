import { AuthenticationService } from '../share/services/authentication.service'
import { Injectable } from '@angular/core';

@Injectable()

export class AppConfig {
	public readonly APIUrl: string = 'http://172.17.19.107:3000/api/v1/';
	public readonly serverUrl: string = 'http://172.17.19.107:3000';
	public currentUser: any;
	constructor(private _authenticationService: AuthenticationService) {
		this._authenticationService.authStatus$
    .subscribe((data: any) => {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    });
	}
}
