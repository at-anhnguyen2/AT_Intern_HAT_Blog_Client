import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { AuthenticationService } from '../../share/services/authentication.service';
import { APIService } from '../../share/services/api.service';

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
    this.haveNotification = false;
    this.showNotification = false;
    this.inputSearch = '';
    this.showSearchResult = false;
    // setInterval(() => {
      if (!this.showNotification && this.currentUser) {
        this._apiService.getNumberNotifications(this.currentUser.username)
        .subscribe((data: any) => {
          this.numberNotification = data.users.count_notifications;
          if (this.numberNotification > 0) {
            this.haveNotification = true;
          } else {
            this.haveNotification = false;
          }
        })
      }
    // }, 3000);
  }

  logout() {
    this._authenticationService.logout();
    window.scroll(0, 0);
  }
  
  moveToTop() {
    window.scroll(0, 0);
  }

  clickNotification() {
    if (this.showNotification) {
      this.showNotification = false;
      if (this.currentUser && this.arrayNotification) {
        let arrayTemp = this.arrayNotification.filter((obj: any) => 
          obj.isChecked === false
        )
        for (var item of arrayTemp) {
          this._apiService.updateNotification(item.id)
          .subscribe((data: any) => {
            this.arrayNotification = data.notifications;
          })
        }
      }
    } else {
      this.showNotification = true;
      this.haveNotification = false;
      if (this.currentUser) {
        this._apiService.getNotifications(this.currentUser.username)
        .subscribe((data: any) => {
          if (data && data.notifications) {
            this.arrayNotification = data.notifications;
          }
        })
      }
    }
  }

  inputSearchChange(e: any) {
    if (e !== '') {
      this._apiService.getSearch(e)
      .subscribe((data: any) => {
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
