import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate() {
        let token = JSON.parse(localStorage.getItem('authData')).token;
        const helper = new JwtHelperService();
        if (helper.isTokenExpired(token)) {
            this.router.navigateByUrl('/login');
            return false;
        } else {
            return true;
        }
    }

}