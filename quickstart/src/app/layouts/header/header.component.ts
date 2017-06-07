import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { AuthenticationService } from '../../share/services/authentication.service'
import { APIService } from '../../share/services/api.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  host: {
    '(document:click)': 'onClick($event)',
  }
})

export class HeaderLayoutComponent {
	isLogined: Observable<boolean>;
  haveNotification: boolean;
	currentUser: any;
  showNotification: boolean;
  numberNotification: number;
  arrayNotification: any;
  notificationsAfter: any;
  notificationsOutput: any;
  inputSearch: string;
  arraySearchResult: any;
  showSearchResult: boolean;
  haveSearchResult: boolean;
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _apiService: APIService,
    private _elementRef: ElementRef
  ) {
    this._authenticationService.authStatus$
    .subscribe((data: any) => {
      this.isLogined = data;
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    });
    console.log(this.currentUser);
    this.haveNotification = false;
    this.showNotification = false;
    this.numberNotification = 0;
    this.arrayNotification = null;
    this.notificationsAfter = null;
    this.notificationsOutput = null;
    this.inputSearch = '';
    this.showSearchResult = false;
  }
  logout() {
    this._authenticationService.logout();
  }
  clickNotification() {
    if (this.showNotification) {
      this.showNotification = false;
      this.notificationsOutput = this.notificationsAfter;
    } else {
      this.showNotification = true;
      // request to server
      if (this.haveNotification) {
        for (var item of this.arrayNotification) {
          console.log(item.id);
          this._apiService.updateNotification(item.id)
          .subscribe((data: any) => {
            this.notificationsAfter = data.notifications;
          })
        }
      }
      this.haveNotification = false;
    }
  }
  getNumberNotification(obj: any) {
    let len;
    if (obj) {
      len = obj.length;
    } else {
      len = 0;
    }
    if (len > 0) {
      this.numberNotification = len;
      this.arrayNotification = obj;
      this.haveNotification = true;
    } else {
      this.numberNotification = 0;
      this.haveNotification = false;
    }
  }
  inputSearchChange(e: any) {
    console.log(e);
    if (e !== '') {
      this._apiService.getSearch(e)
      .subscribe((data: any) => {
        console.log(data);
        if (data && data.articles) {
          this.arraySearchResult = data.articles;
          if (this.arraySearchResult.length === 0) {
            this.haveSearchResult = false;
          } else {
            this.haveSearchResult = true;
          }
        } else {
          console.log('error');
        }
      })
      this.showSearchResult = true;
    } else {
      this.showSearchResult = false;
    }
  }
  onClick(e: any){
    if (this._elementRef.nativeElement.contains(e.target)) {
      if (e.target.className !== 'form-control ng-valid ng-dirty ng-touched' && e.target.className !== 'search-result') {
        this.showSearchResult = false;
      } else {
        if (this.inputSearch !== '') {
          this.showSearchResult = true;
        }
      }
    } else {
      this.showSearchResult = false;
    }
  }
  hideNotification(e: any) {
    this.showNotification = e;
  }
}
