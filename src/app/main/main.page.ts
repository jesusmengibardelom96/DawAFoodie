import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: any;
  email: string;
  nameButton:string = "";
  constructor(private afAuth: AuthServiceService, private router: Router) {
    this.email = "random user";
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("userLoggedin"));
    if(this.user !== null){
      this.email = this.user.email;
    }
  }
  ionViewDidEnter(){
    this.user = JSON.parse(sessionStorage.getItem("userLoggedin"));
    if(this.user !== null){
      this.email = this.user.email;
      this.nameButton = "Log out"
    }else{
      this.nameButton = "Log in";
    }
  }
  logOut(){
    sessionStorage.removeItem("userLoggedin");
    this.router.navigateByUrl("home");
    this.afAuth.signoutUser();
    this.afAuth.googleLogout();
    this.afAuth.facebookLogout();
  }
  logIn(){
    this.router.navigateByUrl("home");
  }
}
