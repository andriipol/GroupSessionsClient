import {Injectable} from '@angular/core';
import {CanActivate, Routes} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationCallbackActivateGuard implements CanActivate {

  constructor(private router: Router, private location: Location) {
  }

  canActivate(): boolean {
    let myPath;
    myPath = this.location.path(true);

    // You may want to make a more robust check here
    let isAuthenticationCallback;
    isAuthenticationCallback = myPath.indexOf('access_token') !== -1;

    if (isAuthenticationCallback) {
      this.router.navigate([''], {fragment: myPath});

      return false;
    }

    return true;
  }
}

export const appRoutingProviders: any[] = [
  AuthenticationCallbackActivateGuard
];
