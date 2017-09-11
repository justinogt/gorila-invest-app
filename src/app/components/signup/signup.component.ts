import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: any;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit(formData) {
    this.userService.signup(formData)
      .then((success) => this.router.navigate(['/member-area']))
      .catch((error) => this.error = error);
  }
}
