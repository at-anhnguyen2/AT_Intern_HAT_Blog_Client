import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class ArticlesListService {
  
  constructor(private _http: Http) {
    // code...
  }

  getArticles() : Observable<any> {
    return this._http.get('./sampledata/articles.json')//http://172.16.28.91:3000/api/v1/articles')
    .map((res: any) => {
      return res.json();
    })
  }
}
