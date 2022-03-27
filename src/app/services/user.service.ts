import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.urlApi;
  user = new UserModel();
  userLogged = new UserModel();
  userToken: string | undefined;
  @Output() getLoggedIn: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.readToken();
  }

  login(user: UserModel) {
    const data = {
      ...user,
      returnSecureToken: true
    }
    return this.http.post(environment.urlApi + '/auth/login', data)
      .pipe(
        map( (resp: any) => {
          if (resp.success) {
            this.userLogged = resp.user;
            this.saveToken(resp['token']);
          }
          return resp;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.getLoggedIn.emit(false);
  }

  newUser(user: UserModel) {
    const data = {
      ...user,
      returnSecureToken: true
    }
    return this.http.post(environment.urlApi + '/users', data)
      .pipe(
        map( (resp: any) => {
          if (resp.success) {
            this.saveToken(resp['token']);
          }
          return resp;
        })
      );
  }

  private saveToken(token: string) {
    this.userToken = token;    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(this.userLogged));
    this.getLoggedIn.emit(true);
  }

  private readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')!;
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated(): boolean {
    if (this.userToken !== undefined && this.userToken.length > 2 ) {
      this.getLoggedIn.emit(true);
      return true;
    } else {
      this.getLoggedIn.emit(false);
      return false;
    }
  }
}
