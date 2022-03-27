import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private userSrv: UserService,
              private router: Router) {
  }

  canActivate() {
    if (this.userSrv.isAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;    
    }
    
  }
  
}
