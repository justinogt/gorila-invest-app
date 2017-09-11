import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';

@Injectable()
export class UserService {

  private LOGIN_PAGE: string = '/login';
  private MEMBER_AREA: string = '/member-area';

  user: FirebaseObjectObservable<any>;

  constructor(private afAuth: AngularFireAuth,
    private dbFire: AngularFireDatabase,
    private router: Router) {
    if (afAuth.auth.currentUser) {
      this.user = dbFire.object('users/' + afAuth.auth.currentUser.uid);
    }
    else {
      afAuth.authState.subscribe(auth => {
        if (auth) {
          this.user = dbFire.object('users/' + auth.uid);
          if (!this.user.hasOwnProperty('email'))
            this.setUser(auth.uid, auth.displayName, auth.email, auth.photoURL);

          router.navigateByUrl(this.MEMBER_AREA);
        }
      });
    }
  }

  getUser(): any {
    return new Promise<any>(
      (resolve, reject) => {
        this.user.take(1).subscribe(user => {
          resolve(user);
        });
      }
    );
  }

  loginFacebook() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginEmail(formData) {
    if (formData.valid) {
      let userData = formData.value;
      return this.afAuth.auth.signInWithEmailAndPassword(userData.email, userData.password);
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl(this.LOGIN_PAGE);
  }

  signup(formData) {
    if (formData.valid) {
      let userData = formData.value;

      return new Promise<any>(
        (resolve, reject) => {
          this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
            .then((success) => {
              this.setUser(this.afAuth.auth.currentUser.uid,
                userData.displayName,
                userData.email,
                '');
              resolve(success);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    }
  }

  private setUser(uid: string, displayName: string, email: string, photoUrl: string) {
    this.user = this.dbFire.object('users/' + uid);
    this.user.set({
      displayName: displayName,
      email: email,
      photoURL: photoUrl
    });
  }
}
