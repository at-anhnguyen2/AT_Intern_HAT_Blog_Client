import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../share/services/api.service';
import { AppConfig } from '../../share/app.config';

@Component({
  selector: 'app-subscribe-button',
  templateUrl: './subscribebutton.component.html'
})

export class SubscribeButtonComponent {
  @Input() value: any = [];
  @Input() article: any = null;
  attentions: any;
  isSubscribed: boolean;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: APIService,
    private _appConfig: AppConfig
  ) {
  	this.isSubscribed = false;
    this.attentions = [];
  }
  ngOnChanges() {
  	this.attentions = this.value;
    if (this.attentions && this.attentions.isFollowed) {
      this.isSubscribed = true;
    } else {
      this.isSubscribed = false;
    }
  }
  clickSubscribe() {
    if (this._appConfig.currentUser) {
      if(this._appConfig.currentUser.username === this.article.user.username) {
        alert('Can not subscribe your article');
      } else {
        this._apiService.subscribeArticle(this.article.slug)
        .subscribe((data: any) => {
          if(data && data.status) {
            if (this.isSubscribed) {
              this.isSubscribed = false;
            } else {
              this.isSubscribed = true;
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
