import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class ArticleService {
  
  constructor(private _http: Http) {
    // code...
  }

  getArticle() : Observable<any> {
    return this._http.get('http://172.16.19.136:3000/api/v1/articles/3')
    .map((res: any) => {
      return res.json();
    })
  }
  getArticles() : Observable<any> {
    return this._http.get('http://172.16.19.136:3000/api/v1/articles')
    .map((res: any) => {
      return res.json();
    })
  }
  getFavoriteArticles() : Observable<any> {
    return this._http.get('http://172.16.19.136:3000/api/v1/articles')
    .map((res: any) => {
      return res.json();
    })
  }
  getPopularArticles() : Observable<any> {
    return this._http.get('http://172.16.19.136:3000/api/v1/articles')
    .map((res: any) => {
      return res.json();
    })
  }
}
