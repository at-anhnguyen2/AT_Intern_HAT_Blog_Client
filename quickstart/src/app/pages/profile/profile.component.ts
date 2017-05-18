import { Component } from '@angular/core';
import { PopularArticlesService } from '../../share/services/populararticles.service';
import { UserProfileService } from '../../share/services/userprofile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html'
})

export class ProfilePageComponent  { 
  arrayPopularArticles: any;
  userProfile: any;
  showArticles: boolean;
  showFollowing: boolean;
  constructor(
  	private _popularArticlesService: PopularArticlesService,
  	private _userProfileService: UserProfileService
  ) {
  	this.showArticles = true;
  	this.showFollowing = false;
  	this._userProfileService.getUserProfile()
  	.subscribe((data: any) => {
  		this.userProfile = data.user;
  	});
  	this._popularArticlesService.getArticles()
  	.subscribe((data: any) => {
  		this.arrayPopularArticles = data.articles;
  	});
  }

  clickArticles() {
  	this.showArticles = true;
  	this.showFollowing = false;
  }
  clickFollowing() {
  	this.showArticles = false;
  	this.showFollowing = true;
  }
}
