import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { Restaurants } from '../models/restaurants.interface';

@Component({
  selector: 'app-no-items',
  templateUrl: './no-items.page.html',
  styleUrls: ['./no-items.page.scss'],
})
export class NoItemsPage implements OnInit {
  user: any = null;
  //delete: boolean = false;
  email: string;
  nameButton: string = "";
  constructor(private afAuth: AuthServiceService, private router: Router, private toast: ToastService, private fire: FirestoreService) {
    this.email = "random user";
  }

  ngOnInit() {
    //this.filteringItems = null;
    this.user = JSON.parse(sessionStorage.getItem("userLoggedin"));
    if (this.user !== null) {
      this.email = this.user.mail;
    } else {
      this.user = {
        mail: "random user"
      };
    }
  }

  ionViewDidEnter() {
    /* let items = this.fire.getCollection(this.user.mail);
    if (items.length === 0) {
      this.router.navigateByUrl("no-items");
    } else {
      this.router.navigateByUrl("main");
    } */
    this.user = null;
    this.user = JSON.parse(sessionStorage.getItem("userLoggedin"));
    if (this.user !== null) {
      this.email = this.user.mail;
      this.nameButton = "Log out"
    } else {
      this.nameButton = "Log in";
    }
  }

  logOut() {
    sessionStorage.removeItem("userLoggedin");
    this.afAuth.signoutUser();
    this.afAuth.googleLogout();
    this.afAuth.facebookLogout();
    this.email = "random user";
    this.router.navigateByUrl("main");
    this.nameButton = "Log in";
  }

  logIn() {
    this.router.navigateByUrl("home");
  }

  addItem(){
    this.router.navigate(['/add', { mail: JSON.stringify(this.email) }]);
  }
  toastInfo(){
    this.toast.presentToast("You have to add something to activate the filters", "primary", 2000);
  }
}
