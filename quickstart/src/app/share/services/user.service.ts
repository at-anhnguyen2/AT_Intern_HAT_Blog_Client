import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class UserService {
  
  constructor(private _http: Http) {
    // code...
  }

  getUser(id: number) : Observable<any> {
    return this._http.get("http://172.16.28.91:3000/api/v1/user/" + id)
    .map((res: any) => {
      return res.json();
    })
  }
}
