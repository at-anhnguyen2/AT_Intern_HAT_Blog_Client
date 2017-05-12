import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class ArticleService {
  
  constructor(private _http: Http) {
    // code...
  }

  getUser() : Observable<any> {
    return this._http.get('./sampledata/singlearticle.json')
    .map((res: any) => {
      return res.json();
    })
  }
}
