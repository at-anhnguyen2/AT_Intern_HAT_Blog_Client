import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';

@Injectable()

export class UserService {
  
  constructor(private _http: Http) {
    // code...
  }

  getUser(id: number) : Observable<any> {
    // return this._http.get("http://172.16.28.91:3000/api/v1/users/" + id)
    return this._http.get('./sampledata/userprofile.json')
    .map((res: any) => {
      return res.json();
    })
  }
  createUser(user: User) {
  	console.log(user);
  	return this._http.post('http://172.16.19.136:3000/api/v1/signup', {"user": user}, this.jwt())
  	.map((res: Response) => {
  		return res.json();
  	})
  }
  updateUser(user: User) {
  	return this._http.put('http://172.16.29.13:3000/api/v1/users/' + user.id, user, this.jwt())
  	.map((res: Response) => {
  		return res.json();
  	})
  }
  deleteUser(id: number) {
  	return this._http.put('http://172.16.29.13:3000/api/v1/users/' + id, this.jwt())
  	.map((res: Response) => {
  		return res.json();
  	})
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
      let headers = new Headers({ 'access_token': currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
