import { Component } from '@angular/core';
import { ArticleService } from '../../share/services/article.service';
import { UserService } from '../../share/services/user.service';

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
  	private _articleService: ArticleService,
  	private _userService: UserService
  ) {
  	this.showArticles = true;
  	this.showFollowing = false;
  	this._userService.getUser(1)
  	.subscribe((data: any) => {
  		this.userProfile = data.user;
  	});
  	this._articleService.getPopularArticles()
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
