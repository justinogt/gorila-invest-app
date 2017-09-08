import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) this.router.navigateByUrl('/dashboard');
    });
  }

  ngOnInit() {
  }

  loginFacebook() {
    this.login(this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()));
  }

  loginGoogle() {
    this.login(this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  loginEmail(formData) {
    if (formData.valid) {
      let userData = formData.value;
      this.login(this.afAuth.auth.signInWithEmailAndPassword(userData.email, userData.password));
    }
  }

  private login(promise: firebase.Promise<any>) {
    promise.then((success) => this.router.navigate(['/member-area']))
      .catch((error) => this.error = error);
  }
}
