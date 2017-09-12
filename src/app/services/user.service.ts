import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';

import { User } from '../data/user';

@Injectable()
export class UserService {

  private _LOGIN_PAGE: string = '/login';
  private _MEMBER_AREA: string = '/member-area';

  afUser: FirebaseObjectObservable<any> = null;
  onUserLogoutEvent: any[] = [];

  private _wasUserLogged: boolean = false;

  constructor(public afAuth: AngularFireAuth,
    private dbFire: AngularFireDatabase,
    private router: Router) {
    if (afAuth.auth.currentUser)
      this.afUser = dbFire.object('users/' + afAuth.auth.currentUser.uid);

    afAuth.authState.subscribe(auth => {
      if (auth) {
        this._wasUserLogged = true;
        if (!this.afUser) this.afUser = dbFire.object('users/' + auth.uid);

        //router.navigateByUrl(this._MEMBER_AREA);
      }
    });
  }

  getUserId(): string {
    return this.afAuth.auth.currentUser.uid;
  }

  loginFacebook() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(auth => {
        var user = auth.user;
        this.setUser(user.uid, new User(user.displayName, user.email, user.photoURL));
      });
  }

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(auth => {
        var user = auth.user;
        this.setUser(user.uid, new User(user.displayName, user.email, user.photoURL));
      });
  }

  loginEmail(formData) {
    if (formData.valid) {
      let userData = formData.value;
      return this.afAuth.auth.signInWithEmailAndPassword(userData.email, userData.password);
    }
  }

  logout() {
    if (this._wasUserLogged) {
      for (let i = 0; i < this.onUserLogoutEvent.length; i++) {
        if (this.onUserLogoutEvent[i])
          this.onUserLogoutEvent[i]();
      }
      this.onUserLogoutEvent = [];
    }
    this._wasUserLogged = false;

    this.afAuth.auth.signOut();
    this.router.navigateByUrl(this._LOGIN_PAGE);
  }

  signup(formData) {
    if (formData.valid) {
      let userData = formData.value;

      return new Promise<any>(
        (resolve, reject) => {
          this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
            .then(user => {
              this.setUser(user.uid, new User(userData.displayName, userData.email, ""));
              resolve(user);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    }
  }

  private setUser(uid: string, user: User) {
    this.afUser = this.dbFire.object('users/' + uid);
    if (!this.afUser.hasOwnProperty('email')) {
      this.afUser.set(user);
    }
  }
}
