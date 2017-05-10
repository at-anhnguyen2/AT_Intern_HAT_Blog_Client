import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class TagsListService {
  
  constructor(private _http: Http) {
    // code...
  }

  getUser() : Observable<any> {
    return this._http.get('./sampledata/tagslist.json')
    .map((res: any) => {
      return res.json();
    })
  }
}
