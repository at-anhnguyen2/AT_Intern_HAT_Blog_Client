import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class TagsListService {
  
  constructor(private _http: Http) {
    // code...
  }

  getTags() : Observable<any> {
    return this._http.get('./sampledata/tagslist.json')
    .map((res: Response) => {
      return res.json();
    });
  }
}
