import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: any;

  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      let userData = formData.value;
      this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
        .then((success) => this.router.navigate(['/member-area']))
        .catch((error) => this.error = error);
    }
  }
}
