import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public afAuth: AngularFireAuth, private toast: ToastService, private router: Router, private fire: FirestoreService) { }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          let user = {
            mail: res.user.email
          };
          this.router.navigateByUrl("main");
          this.toast.presentToast("SignIn successful", "success", 2000);
          sessionStorage.setItem("userLoggedin", JSON.stringify(user));
          console.log(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          let user = {
            mail: res.user.email
          };
          resolve(res);
          this.router.navigateByUrl("main");
          this.toast.presentToast("SignIn successful", "success", 3000);
          sessionStorage.setItem("userLoggedin", JSON.stringify(user));
        })
    })
  }

  facebookLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut()
        resolve();
      }
      else {
        reject();
      }
    });
  }

  googleLogout() {
    firebase.auth().signOut().then(function () {
      console.log("logout successful");
    }, function (error) {
      console.log(error);
    });
  }
  createUser(email: string, password: string) {
    console.log('Creando el usuario con email ' + email);

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((newCredential: firebase.auth.UserCredential) => {
        console.log(newCredential);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }

  loginUser(email, password) {
    console.log('Loging user ' + email);

    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((newCredential: firebase.auth.UserCredential) => {
        console.log(newCredential);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }

  signoutUser() {
    return this.afAuth.auth.signOut();
  }

  async resetPasswd(mail: string) {
    return this.afAuth.auth.sendPasswordResetEmail(mail);
  }
}
