import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GuestGuardService implements CanActivate {

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {

    console.log(state);

    if (!this._auth.isLoggedIn()) {
      return true;
    }
    else {
      return this._router.parseUrl('/admin');
    }

  }
}