import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';
import { LoadingController, Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private platform: Platform,private googlePlus: GooglePlus, private loadingController: LoadingController, public afAuth: AngularFireAuth, private toast: ToastService, private router: Router, private fire: FirestoreService) { }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(async res => {
          let user = {
            mail: res.user.email
          };
          this.fire.getCollection(user.mail);
          setTimeout(()=>{
            resolve(res);
            if(this.fire.getCollection(user.mail).length === 0){
              this.fire.removeArray();
              this.router.navigateByUrl("no-items");
            }else{
              this.fire.removeArray();
              this.router.navigateByUrl("main");
            }
          }, 2000);
          const loading = await this.loadingController.create({
            message: 'Login in...',
            spinner: 'dots',
            duration: 2000
          });
          await loading.present();

          const { role, data } = await loading.onDidDismiss();
          this.toast.presentToast("SignIn successful", "success", 2000);
          sessionStorage.setItem("userLoggedin", JSON.stringify(user));
          console.log(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
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
      })

  }
  onLoginError(err) {
    console.log(err);
  }
  async testLog(res) {
          let user = {
            mail: res.user.email
          };
          sessionStorage.setItem("userLoggedin", JSON.stringify(user));
          setTimeout(()=>{
            if(this.fire.getCollection(user.mail).length === 0){
              this.router.navigateByUrl("no-items");
            }else{
              this.fire.removeArray();
              this.router.navigateByUrl("main");
            }
          }, 5000);
          const loading = await this.loadingController.create({
            message: 'Login in...',
            spinner: 'dots',
            duration: 5000
          });
          await loading.present();

          const { role, data } = await loading.onDidDismiss();
          this.toast.presentToast("SignIn successful", "success", 3000);
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
