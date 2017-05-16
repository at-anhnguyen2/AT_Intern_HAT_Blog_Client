import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class FavoriteArticlesService {
  
  constructor(private _http: Http) {
    // code...
  }

  getArticles() : Observable<any> {
    return this._http.get('./sampledata/favoritearticles.json')
    .map((res: any) => {
      return res.json();
    })
  }
}