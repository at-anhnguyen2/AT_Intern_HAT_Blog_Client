import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Article } from '../../models/article';

@Injectable()

export class ArticleService {
  
  constructor(private _http: Http) {
    // code...
  }

  getArticle(slug: string) : Observable<any> {
    return this._http.get('http://172.17.19.122:3000/api/v1/articles/' + slug)
    // return this._http.get('./sampledata/singlearticle.json')
    .map((res: any) => {
      return res.json();
    })
  }
  getArticles() : Observable<any> {
    return this._http.get('http://172.17.19.122:3000/api/v1/articles')
    // return this._http.get('./sampledata/articles.json')
    .map((res: any) => {
      return res.json();
    })
  }
  getFavoriteArticles() : Observable<any> {
    // return this._http.get('http://172.16.19.136:3000/api/v1/articles')
    return this._http.get('./sampledata/favoritearticles.json')
    .map((res: any) => {
      return res.json();
    })
  }
  getPopularArticles() : Observable<any> {
    // return this._http.get('http://172.16.19.136:3000/api/v1/articles')
    return this._http.get('./sampledata/populararticles.json')
    .map((res: any) => {
      return res.json();
    })
  }
  createArticle(article: any) {
    return this._http.post('http://172.17.19.122:3000/api/v1/articles',article , this.jwt())
    .map((res: any) => {
      return res.json();
    })
  }
  updateArticle(article: any, slug: string) {
    console.log(article.get('title_image'));
    return this._http.put('http://172.17.19.122:3000/api/v1/articles/' + slug, article, this.jwt())
    .map((res: any) => {
      return res.json();
    })
  }
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
      let headers = new Headers(
        {
          'access_token': currentUser.access_token,
          // 'Accept': 'application/json',
          // 'enctype': 'multipart/form-data'
          // 'Content-Type': 'image/jpeg'
        });
      return new RequestOptions({ headers: headers });
    }
  }
  // deleteArticle(id: number) {
  //   return this._http.put('http://172.16.19.136:3000/api/v1/article/' + id)
  //   .map((res: any) => {
  //     return res.json();
  //   })
  // }
}
