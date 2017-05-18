import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html'
})

export class HeaderLayoutComponent {
	isLogined: boolean;
	currentPage: string;
	isHome: boolean = false;
	isEditor: boolean = false;
	isSignIn: boolean = false;
	isSignUp: boolean = false;
  constructor(private _router: Router) {
  	this.isLogined = false;
  	_router.events.subscribe((value: any) => {
  		this.currentPage = value.url.substring(1);
  		switch (this.currentPage) {
	  		case "home":
	  			this.isHome = true;
	  			this.isEditor = false;
	  			this.isSignIn = false;
	  			this.isSignUp = false;  
	  			break;
	  		case "editor":
	  			this.isHome = false;
	  			this.isEditor = true;
	  			this.isSignIn = false;
	  			this.isSignUp = false;
	  			break;
	  		case "login":
	  			this.isHome = false;
	  			this.isEditor = false;
	  			this.isSignIn = true;
	  			this.isSignUp = false;
	  			break;
	  		case "register":
	  			this.isHome = false;
	  			this.isEditor = false;
	  			this.isSignIn = false;
	  			this.isSignUp = true;
	  			break;
	  		default:
	  			this.isHome = false;
	  			this.isEditor = false;
	  			this.isSignIn = false;
	  			this.isSignUp = false;
	  			break;
	  	}
  	});
  }
}
