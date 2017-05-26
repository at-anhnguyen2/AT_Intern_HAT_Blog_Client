import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(email: string, password: string) {
    let body = {
      email: email,
      password: password
    }
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    // console.log(JSON.stringify(body));
    return this.http.post('http://172.17.19.122:3000/api/v1/signin', JSON.stringify(body), {headers: headers})
    .map((response: Response) => {
      // login successful if there's a jwt token in the response
      let user = response.json();
      console.log(user);
      if (user && user.access_token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    });
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
}