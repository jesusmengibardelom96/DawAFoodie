import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Restaurants } from '../models/restaurants.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: any = null;
  email: string;
  nameButton: string = "";
  hideObject: boolean = true;
  searchTerm: string = "";
  items: any[] = [];
  searchTermChck: boolean = null;
  filterArray: any[] = [];
  priceRange: string;
  filterActivated: boolean = false;
  constructor(public alert: AlertController, private afAuth: AuthServiceService, private router: Router, private restaurants: RestaurantsService, private route: ActivatedRoute, private fire: FirestoreService) {
    this.email = "random user";
  }

  ngOnInit() {
    console.log(this.user);
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
    this.user = null;
    this.items = this.fire.removeArray();
    this.user = JSON.parse(sessionStorage.getItem("userLoggedin"));
    if (this.user !== null) {
      this.email = this.user.mail;
      this.items = this.fire.getCollection(this.email);
      this.filterArray = this.items;
      console.log(this.items);
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
    this.items = this.fire.removeArray();
    this.router.navigateByUrl("main");
    this.nameButton = "Log in";
  }

  logIn() {
    this.router.navigateByUrl("home");
  }

  hideOn() {
    this.hideObject = !this.hideObject;
    this.searchTermChck = false;
    this.searchTerm = "";
  }

  activateFilter(){
    if(this.filterActivated === false){
      this.filterActivated = true;
    }
  }

  filterItems(){
    let arrayTest = [];
    this.items = this.fire.removeArray();
    for (let i of this.filterArray) {
      if(this.filterActivated === true){
        if (i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);
        else if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);
      }else{
        if (i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0) arrayTest.push(i);
        else if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0) arrayTest.push(i);
      }
    }
    this.items = arrayTest;
  }

  goToEdit(item) {
    this.router.navigate(['/edit', { restaurant: JSON.stringify(item) }]);
  }

  resetItems(){
    this.searchTerm = "";
    this.searchTermChck = false;
    this.filterActivated = false;
    this.items = this.filterArray;
  }

  deleteItem(item){
    this.fire.removeARestaurant(item.id);
    const index = this.items.findIndex(order => order.id === item.id);
    this.items.splice(index, 1);
    console.log(this.items);
    const index2 = this.filterArray.findIndex(order => order.name === item.name);
    this.filterArray.splice(index2, 1);
    console.log(this.items);
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Help',
      message: "€ - Means that the price is between 15-30<br><br>€€ - Means that the price is between 30-45<br><br>€€€ - Means that the price is greater than 45",
      buttons: ['OK']
    });

    await alert.present();
  }

  helpModal(){
    this.presentAlert();
  }

  addItem(){
    console.log(this.email);
    this.router.navigate(['/add', { mail: JSON.stringify(this.email) }]);
  }

  goToLoginPage(){
    this.router.navigateByUrl('home');
  }
}
