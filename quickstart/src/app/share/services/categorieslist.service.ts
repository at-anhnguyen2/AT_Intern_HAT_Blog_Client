import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class CategoriesService {
  
  constructor(private _http: Http) {
    // code...
  }

  getUserProfile() : Observable<any> {
    return this._http.get('./sampledata/categories.json')
    .map((res: any) => {
      return res.json();
    })
  }
}
