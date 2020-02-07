import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';
import { LoadingController, Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private fb : Facebook,private platform: Platform, private googlePlus: GooglePlus, private loadingController: LoadingController, public afAuth: AngularFireAuth, private toast: ToastService, private router: Router, private fire: FirestoreService) { }
  async doFacebookLogin() {

    this.fb.login(['email'])
      .then((response: FacebookLoginResponse) => {
        this.onFbLoginSuccess(response);
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + error)
      });
  }
  onFbLoginSuccess(res: FacebookLoginResponse) {
    //const { token } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.afAuth.auth.signInWithCredential(credential)
      .then((response) => {
        let user = {
          mail: response.user.email
        };
        //console.log(response);
        sessionStorage.setItem("userLoggedin", JSON.stringify(user));
        this.router.navigate(["/main"]);
        this.loadingController.dismiss();
        this.toast.presentToast("SignIn successful", "success", 3000);
      })

  }
  onFbLoginError(err) {
    console.log(err);
  }
  async doGoogleLogin() {
    let params;
    if (this.platform.is('android')) {
      params = {
        'webClientId': '886966994282-kn7eevutf7bsgpdrelmpng8m0fqh9rka.apps.googleusercontent.com',
        'offline': true
      }
    }
    else {
      params = {}
    }
    this.googlePlus.login(params)
      .then((response) => {
        const { idToken, accessToken } = response
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.afAuth.auth.signInWithCredential(credential)
      .then((response) => {
        this.testLog(response);
        this.loadingController.dismiss();
        this.toast.presentToast("SignIn successful", "success", 3000);
      })

  }
  onLoginError(err) {
    console.log(err);
  }
  async testLog(res) {
    let user = {
      mail: res.user.email
    };
    //console.log(response);
    sessionStorage.setItem("userLoggedin", JSON.stringify(user));
  }

  facebookLogout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/main"]);
    })
  }

  googleLogout() {
    this.googlePlus.disconnect();
    this.afAuth.auth.signOut().then(function () {
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
