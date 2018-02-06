import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {User} from '../user';
import {tokenNotExpired} from 'angular2-jwt';





@Injectable()
export class AuthService {
   authToken: any;
   user: any;

  domain: string = 'http://localhost:8000/';

  registerUrl: string = this.domain +'users/register';
  authenticateUrl: string = this.domain+ 'users/authenticate';
  profileUrl: string = this.domain + 'users/profile';

  constructor(private _http: HttpClient) { }

  registerUser(user: User): Observable<any>{
    let headers = new HttpHeaders();
    let h1=headers.append('Content-Type', 'Application/json');
    return this._http.post<User>(this.registerUrl, user, {headers: h1});
  }

  authenticateUser(user: Object): Observable<any>{
    let headers = new HttpHeaders();
    let h1=headers.append('Content-Type', 'Application/json');
    return this._http.post<User>(this.authenticateUrl, user, {headers: h1});
  }

  storeUserData(token, user){
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
  }

  getProfile(): Observable<any>{
      this.loadToken();
      let headers = new HttpHeaders();
      let h1=headers.append('Content-Type', 'Application/json');
      let h2=headers.append('Authorization', this.authToken);
      return this._http.get<User>(this.profileUrl, { headers: h2});
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }
  loadToken(){
      let token = localStorage.getItem('id_token');
      this.authToken = token;
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
