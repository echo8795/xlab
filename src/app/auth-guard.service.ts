import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{
  // constructor(private authService: {}, private router: Router) {}

	canActivate(): boolean {
    console.log('AuthGuard#canActivate called');
    return true;
  }
}