import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../share/services/api.service';
import { AppConfig } from '../../share/app.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

export class ProfilePageComponent  { 
  currentUser: any;
  arrayPopularArticles: any;
  arrayFollowingUser: any;
  userProfile: any;
  showArticles: boolean;
  showFollowing: boolean;
  isCurrentUser: boolean;
  param: any;
  paramUsername: string;
  constructor(
  	private _apiService: APIService,
    private _appConfig: AppConfig,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.currentUser = _appConfig.currentUser;
  	this.showArticles = true;
  	this.showFollowing = false;
  }

  clickArticles() {
  	this.showArticles = true;
  	this.showFollowing = false;
  }
  clickFollowing() {
  	this.showArticles = false;
  	this.showFollowing = true;
  }
  ngOnInit() {
    this.param = this._route.params.subscribe((data: any) => {
      this.paramUsername = data['username'];
      this._apiService.getUser(this.paramUsername)
      .subscribe((data: any) => {
        this.userProfile = data.user;
        this._apiService.getPopularArticles(data.user.username)
        .subscribe((data: any) => {
          this.arrayPopularArticles = data.articles;
        });
        this._apiService.getFollowingUser(data.user.username)
        .subscribe((data: any) => {
          console.log(data.users);
          this.arrayFollowingUser = data.users;
        });
        if (this.currentUser && (this.currentUser.username === data.user.username)) {
          this.isCurrentUser = true;
        } else {
          this.isCurrentUser = false;
        }
      });
    })
  }
}
