import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new UserModel();
  constructor(private userSrv: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    if(form.invalid) {
      return;
    }
    
    this.userSrv.login(this.user).subscribe((resp: any) => {
      if (!resp.success) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Oops...',
          text: resp.msg
        })
      } else {
        this.router.navigate(['/home']);
      }
    }, (err) => {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Oops...',
        text: err.error.msg
      })
    })
  }  
}
