import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  authStatus = new BehaviorSubject(false);
  authStatus$ = this.authStatus.asObservable();
  constructor(private http: Http) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if( currentUser ) {
      this.authStatus.next(true);
    } else {
      this.authStatus.next(false);
    }
  }

  login(email: string, password: string) : Observable<boolean> {
    let body = {
      email: email,
      password: password
    }
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('http://172.17.19.153:3000/api/v1/authorizations', JSON.stringify(body), {headers: headers})
    .map((response: Response) => {
      // login successful if there's a jwt token in the response
      let user = response.json().user;
      console.log(user);
      if (user && user.access_token) {
        console.log('1');
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authStatus.next(true);
      }
      return user;
    });
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.authStatus.next(false);
  }
}