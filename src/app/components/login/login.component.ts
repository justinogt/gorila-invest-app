import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
  }

  loginFacebook() {
    this.login(this.userService.loginFacebook());
  }

  loginGoogle() {
    this.login(this.userService.loginGoogle());
  }

  loginEmail(formData) {
    this.login(this.userService.loginEmail(formData));
  }

  private login(promise: firebase.Promise<any>) {
    promise.then((success) => this.router.navigate(['/member-area']))
      .catch((error) => this.error = error);
  }
}
