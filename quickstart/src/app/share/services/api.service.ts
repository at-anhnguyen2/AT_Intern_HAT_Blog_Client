import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Article } from '../../models/article';
import { User } from '../../models/user';
import { AppConfig } from '../../share/app.config';
import { AuthenticationService } from '../../share/services/authentication.service'

@Injectable()

export class APIService {
  APIUrl: string;
  currentUser: any;
  constructor(
    private _http: Http,
    private _appConfig: AppConfig,
    private _authenticationService: AuthenticationService
   ) {
    this.APIUrl = _appConfig.APIUrl;
    this._authenticationService.authStatus$
    .subscribe((data: any) => {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    });
  }

  private jwt() {
    // create authorization header with jwt token
    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser && this.currentUser.access_token) {
      let headers = new Headers(
        {
          'access_token': this.currentUser.access_token,
        });
      return new RequestOptions({ headers: headers });
    }
  }
  
  // Article
  getArticle(slug: string) : Observable<any> {
    return this._http.get(this.APIUrl + 'articles/' + slug, this.jwt())
    .map((res: any) => {
      return res.json();
    })
  }
  getArticles(limit: number, category: number, page: number, tag: number) : Observable<any> {
    let query = "";
    if( category > 0 ) {
      query += '&category_id=' + category;
    }
    if (page !== 0) {
      query += '&current_page=' + page;
    }
    if (tag !== 0 ){
      query += '&tag_id=' + tag;
    }
    return this._http.get(this.APIUrl + 'articles?limit=' + limit + query, this.jwt())
    .map((res: any) => {
      return res.json();
    })
  }
  getFavoriteArticles() : Observable<any> {
    return this._http.get(this.APIUrl + 'articles/hot_articles')
    .map((res: any) => {
      return res.json();
    })
  }
  getPopularArticles(username: string) : Observable<any> {
    return this._http.get(this.APIUrl + 'users/' + username + '/user_articles')
    .map((res: any) => {
      return res.json();
    })
  }
  createArticle(article: any) {
    return this._http.post(this.APIUrl + 'articles',article , this.jwt())
    .map((res: any) => {
      return res.json();
    })
  }
  updateArticle(article: any, slug: string) {
    return this._http.put(this.APIUrl + 'articles/' + slug, article, this.jwt())
    .map((res: any) => {
      return res.json();
    })
  }
  deleteArticle(slug: string) {
    return this._http.delete(this.APIUrl + 'articles/' + slug, this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }

  // User
  getUser(username: string) : Observable<any> {
    return this._http.get(this.APIUrl + "users/" + username, this.jwt())
    .map((res: any) => {
      return res.json();
    })
  }
  createUser(user: User) {
    return this._http.post(this.APIUrl + 'users/', user)
    .map((res: Response) => {
      return res.json();
    })
  }
  updateUser(user: any, username: string) {
    return this._http.put(this.APIUrl + 'users/' + username, user, this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }
  deleteUser(username: string) {
    return this._http.put(this.APIUrl + 'users/' + username, this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }
  getFollowingUser(username: string) {
    return this._http.get(this.APIUrl + 'users/' + username + '/follow_users')
    .map((res: Response) => {
      return res.json();
    })
  }

  // Category
  getCategories() : Observable<any> {
    return this._http.get(this.APIUrl + 'categories')
    .map((res: any) => {
      return res.json();
    })
  }

  // Tag
  getTags() : Observable<any> {
    return this._http.get(this.APIUrl + 'tags')
    .map((res: Response) => {
      return res.json();
    });
  }

  // Comment
  getComments(slug: string) {
    return this._http.get(this.APIUrl + 'articles/' + slug + '/comments')
    .map((res: Response) => {
      return res.json();
    })
  }
  createComment(slug: string, content: string) {
    let comments = {
      content: content
    }
    return this._http.post(this.APIUrl + 'articles/' + slug + '/comments',  comments, this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }
  updateComment(slug: string, id: number, content: string) {
    let comments = {
      content: content
    }
    return this._http.put(this.APIUrl + 'articles/' + slug + '/comments/' + id, { comments: comments }, this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }
  deleteComment(slug: string, id: number) {
    return this._http.delete(this.APIUrl + 'articles/' + slug + '/comments/' + id, this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }

  // Attentions
  followUser(username: string) {
    return this._http.post(this.APIUrl + 'users/' + username + '/follow_users', {}, this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }
  subscribeArticle(slug: string) {
    return this._http.post(this.APIUrl + 'articles/' + slug + '/follows', {}, this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }
  likeArticle(slug: string) {
    return this._http.post(this.APIUrl + 'articles/' + slug + '/likes', {}, this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }

  // notification
  getNotifications(username: string) {
    return this._http.get(this.APIUrl + 'users/' + username + '/notifications', this.jwt())
    // return this._http.get(this.APIUrl + 'notifications', this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }
  updateNotification(id: number) {
    return this._http.put(this.APIUrl + 'users/' + this.currentUser.username + '/notifications/' + id, {}, this.jwt())
    // return this._http.put(this.APIUrl + 'notifications/' + id, {}, this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }
  getNumberNotifications(username: string) {
    return this._http.get(this.APIUrl + 'users/' + username + '/notification_users', this.jwt())
    .map((res: Response) => {
      return res.json();
    })
  }

  // search
  getSearch(keyword: string) {
    return this._http.get(this.APIUrl + 'searchs/' + keyword)
    .map((res: Response) => {
      return res.json();  
    })
  }
}
