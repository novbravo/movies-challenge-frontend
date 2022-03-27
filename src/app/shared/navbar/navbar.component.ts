import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged = false;
  user = new UserModel();
  constructor(private userSrv: UserService,
              private router: Router) { 
                this.userSrv.getLoggedIn.subscribe(logged => this.changedLogged(logged))
              }

  private changedLogged(logged: boolean) {
    this.logged = logged;
  }
  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user)
      this.user = JSON.parse(user);
    else {
      this.user = new UserModel();
    }
  }

  logout() {
    this.userSrv.logout();
    this.logged = false;
    this.router.navigateByUrl('/login');
  }
}
