import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-LogInButtons',
  templateUrl: 'LogInButtons.page.html',
  styleUrls: ['LogInButtons.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private afAuth: AuthServiceService, private fire: FirestoreService) {}

  ngOnInit(){
  }

  facebookLogIn(){
    this.afAuth.doFacebookLogin();
  }

  googleLogIn(){
    this.afAuth.doGoogleLogin();
  }

  signUp(){
    this.router.navigateByUrl("register");
  }

  signIn(){
    this.router.navigateByUrl("login-mail");
  }
}
