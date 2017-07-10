import { AuthenticationService } from '../share/services/authentication.service'
import { Injectable } from '@angular/core';

@Injectable()

export class AppConfig {
	public readonly serverUrl: string = 'http://localhost:9000';//'http://172.17.19.185:9000';
	public readonly APIUrl: string = this.serverUrl + '/api/v1/';
	public currentUser: any;
	constructor(private _authenticationService: AuthenticationService) {
		this._authenticationService.authStatus$
    .subscribe((data: any) => {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    });
	}
}
