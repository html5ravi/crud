import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthInfo } from './auth-info';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null);
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);
  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.router.navigate(['/home']);
      });
    });
  }



  logout() {
    this.afAuth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.router.navigate(['/home']);
  }
}
