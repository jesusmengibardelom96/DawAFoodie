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
  user: any = {
    mail: ""
  };
  newItems: any[] = [];
  email: string;
  nameButton: string = "";
  hideObject: boolean = true;
  searchTerm: string = "";
  items: any[] = [];
  searchTermChck: boolean = false;
  filterArray: any[] = [];
  /* edited: boolean;
  restaurantEdited: any;*/
  priceRange: string;
  constructor(public alert: AlertController, private afAuth: AuthServiceService, private router: Router, private restaurants: RestaurantsService, private route: ActivatedRoute, private fire: FirestoreService) {
    this.email = "random user";
  }

  ngOnInit() {
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
    /* sessionStorage.removeItem("itemsEditados");
    sessionStorage.removeItem("itemsViejos");
    sessionStorage.removeItem("itemEditado"); */
    /* this.newItems = []; */
    this.router.navigateByUrl("home");
    this.afAuth.signoutUser();
    this.afAuth.googleLogout();
    this.afAuth.facebookLogout();
  }

  logIn() {
    this.router.navigateByUrl("home");
  }

  hideOn() {
    /*this.items = this.fire.removeArray();*/
    this.hideObject = !this.hideObject;
    /*for (let item of this.filterArray) {
      if (this.user.mail === item.mail) {
        this.items.push(item);
        this.filterArray = this.items;
      }
    }*/
    //console.log(this.newItems);
    this.searchTermChck = false;
    this.searchTerm = "";
  }

  filterItems(){
    let arrayTest = [];
    this.items = this.fire.removeArray();
    for (let i of this.filterArray) {
      if (i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);
      else if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);
    }
    this.items = arrayTest;
  }
  /*setFilteredItems() {
    let arrayTest = [];
    this.newItems = [];
    console.log(this.filterArray);
    for (let i of this.filterArray) {
      if(i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited !== this.searchTermChck) arrayTest = [];
      else if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase() && i.visited !== this.searchTermChck) >= 0) arrayTest = [];
      else if (i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);
      else if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);

      if (i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0) arrayTest.push(i);
      else if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0) arrayTest.push(i);

      if(this.searchTerm.trim()==="") arrayTest = [];

    }

    this.newItems = arrayTest;
  }*/

  /*setFilteredItems2() {
    let arrayTest = [];
    this.newItems = [];
    for (let i of this.filterArray) {
      if (i.visited === this.searchTermChck){
        arrayTest.push(i);
      }
      if(i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);
      if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase() && i.visited === this.searchTermChck) >= 0) arrayTest.push(i);
    }
    this.newItems = arrayTest;
  }*/
  goToEdit(item) {
    this.router.navigate(['/edit', { restaurant: JSON.stringify(item) }]);
    /* this.edited = true;
    sessionStorage.setItem("itemsViejos", JSON.stringify(this.newItems));
    this.router.navigate(['/edit', { restaurant: JSON.stringify(item) }]);
    const index = this.filterArray.findIndex(order => order.name === item.name);
    this.filterArray.splice(index, 1);
    this.newItems.splice(index, 1); */

  }

  resetItems(){
    this.searchTerm = "";
    this.searchTermChck = false;
    this.items = this.filterArray;
  }

  deleteItem(item){
    const index = this.items.findIndex(order => order.id === item.id);
    this.items.splice(index, 1);
    const index2 = this.filterArray.findIndex(order => order.name === item.name);
    this.filterArray.splice(index2, 1);
    this.fire.removeARestaurant(item.id);
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
}
