import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { stringify } from 'querystring';
import { GlobalContent  } from './../global.constant';

@Injectable()
export class AuthenticationService {
    constructor(public _http: Http) { 
    }

    login(username: string, password: string) {
          return this._http.post("", {
            username: username,
            password: password
          })
          .map(data => {
              let user = JSON.parse((<any>data)._body);
                    if (user && user.username) {
                        // store user details in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', user.username);
                    }
                    return user;
                });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.clear();
    }
}