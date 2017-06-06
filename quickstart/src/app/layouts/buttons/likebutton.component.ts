import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../share/services/api.service';
import { AppConfig } from '../../share/app.config';

@Component({
  selector: 'app-like-button',
  templateUrl: './likebutton.component.html'
})

export class LikeButtonComponent {
  @Input() value: any;
  @Input() count: number = 0;
  @Input() slug: string = "";
  isLiked: boolean;
  countLike: number;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: APIService,
    private _appConfig: AppConfig
  ) {
  	this.isLiked = false;
  }
  ngOnChanges() {
    this.countLike = this.count;
    if (this.value && this.value.isLiked) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  }
  clickLike() {
    if (this._appConfig.currentUser) {
      this._apiService.likeArticle(this.slug)
      .subscribe((data: any) => {
        if(data && data.status) {
          this.countLike = data.count_likes;
          if (this.isLiked) {
            this.isLiked = false;
          } else {
            this.isLiked = true;
          }
        } else {
          alert(data.errors[0].message[0].valid);
        }
      })
    } else {
      this._router.navigate(['/login']);
    }
  }
}
