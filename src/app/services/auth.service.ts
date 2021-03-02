import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = '';
  isRecuperarSenha: boolean = false;
  token: string;
  user: any;

  constructor(
    public http: HttpClient,
    public global: GlobalService,
  ) { }

  login(user) {
    return this.http.post(this.global.apiUrl + '/usuario/autenticar', user);
  }

  getAuthorizationHeader() {
    return new HttpHeaders().append('Authorization', 'Basic ' + this.token);
  }

  getUserStorage() {
    return JSON.parse(localStorage.getItem('user_wwc'));
  }

  setToken(token) {
    if (!token) {
      return;
    }

    this.token = token;
    localStorage.setItem('token_wwc', this.token);
  }

  setUser(user) {
    if (!user) {
      return;
    }

    localStorage.setItem('user_wwc', JSON.stringify(user));
    this.user = this.getUserStorage();
  }

  getUser(user) {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.apiUrl + '/usuario/buscar?email=' + user.email)
        .subscribe((res: any) => {
          resolve(res);
        }, (e) => {
          reject(e);
        });
    })
  }

  logout() {
    this.token = undefined;
    this.user = null;
    localStorage.clear();
  }

  isLoggedIn() {
    if (!this.token) {
      if (localStorage.getItem('token_wwc')) {
        this.setToken(localStorage.getItem('token_wwc'));
        this.user = this.getUserStorage();
      } else {
        return false;
      }
    }

    return true;
  }

  forgotPassword(user) {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.apiUrl + '/usuario/esqueceuSenha?email=' + user.email)
        .subscribe((res: any) => {
          resolve(res);
        }, (e) => {
          reject(e);
        });
    })
  }
}
