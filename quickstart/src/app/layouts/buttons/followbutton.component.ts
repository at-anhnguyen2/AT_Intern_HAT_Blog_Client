import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../share/services/api.service';
import { AppConfig } from '../../share/app.config';

@Component({
  selector: 'app-follow-button',
  templateUrl: './followbutton.component.html'
})

export class FollowButtonComponent {
  @Input() value: any = null;
  user: any;
  isFollowed: boolean;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: APIService,
    private _appConfig: AppConfig
  ) {
  	this.isFollowed = false;
    this.user = null;
  }
  ngOnChanges() {
  	this.user = this.value;
    this.isFollowed = this.user.isfollow;
  }
  clickFollow() {
    if (this._appConfig.currentUser) {
      if (this._appConfig.currentUser.username === this.user.username) {
        alert('Can not follow yourself');
      } else {
        this._apiService.followUser(this.user.username)
        .subscribe((data: any) => {
          if(data && data.status) {
            if (this.isFollowed) {
              this.isFollowed = false;
            } else {
              this.isFollowed = true;
            }
          } else {
            alert(data.errors[0].message[0].valid);
          }
        });
      }
    } else {
      this._router.navigate(['/login']);
    }
  }
}
