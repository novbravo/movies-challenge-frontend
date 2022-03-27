import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModel } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new UserModel();
  constructor(private userSrv: UserService,
              private router: Router) { }

  ngOnInit() {
    
  }

  registerUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    this.userSrv.newUser(this.user).subscribe((resp: any) => {
      if (resp.success) {
        this.sweetAlertMessage(1, '');
      } else {
        this.sweetAlertMessage(0, resp.msg);
      }
    }, (err) => {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Oops...',
        text: err.error.msg
      })
    });
  }

  sweetAlertMessage(code: number, msg: string) {
    if (code === 1 ) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          title: 'User saved successfully'
        }).then((result) => {
          this.router.navigate(['/home']);
        })  
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Oops...',
        text: msg
      })
    }
  }

}
