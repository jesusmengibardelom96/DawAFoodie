import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Restaurants } from '../models/restaurants.interface';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: any = null;
  filteringItems: boolean = null;
  deleteResta: any = null;
  delete: boolean = false;
  email: string;
  nameButton: string = "";
  hideObject: boolean = true;
  searchTerm: string = "";
  items: Restaurants[] = [];
  searchTermChck: boolean = null;
  filterArray: any[] = [];
  priceRange: string;
  filterActivated: boolean = false;
  constructor(private toats: ToastService, private alert: AlertController, private afAuth: AuthServiceService, private router: Router, private route: ActivatedRoute, private fire: FirestoreService) {
    this.email = "random user";
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("userLoggedin"));
    if (this.user !== null) {
      console.log("Hola estoy entrando en el ng on init");
      this.email = this.user.mail;
      /* this.items = this.fire.getCollection(this.email);
      this.filterArray = this.items; */+
        console.log(this.items);
    } else {
      this.user = {
        mail: "random user"
      };
    }
  }

  ionViewDidEnter() {
    console.log(this.items);
    this.user = null;
    this.user = JSON.parse(sessionStorage.getItem("userLoggedin"));
    if (this.user !== null) {
      this.email = this.user.mail;
      if (this.deleteResta === true) {
        this.items = this.fire.removeArray();
        this.items = this.fire.getCollection(this.email);
        this.deleteResta = false;
      } else if (this.items.length === 0) {
        this.items = this.fire.getCollection(this.email);
        this.filterArray = this.items;
      }
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
    this.filteringItems = true;
    this.hideObject = !this.hideObject;
    this.searchTermChck = false;
    this.searchTerm = "";
  }

  activateFilter() {
    if (this.filterActivated === false) {
      this.filterActivated = true;
    }
  }

  filterItems() {
    let arrayTest = [];
    this.items = [];
    for (let i of this.filterArray) {
      if (this.filterActivated === true) {
        if (i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);
        else if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);
      } else {
        if (i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0) arrayTest.push(i);
        else if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0) arrayTest.push(i);
      }
    }
    this.items = arrayTest;
  }

  goToEdit(item) {
    this.router.navigate(['/edit', { restaurant: JSON.stringify(item) }]);
    this.deleteResta = true;
  }

  resetItems() {
    this.searchTerm = "";
    this.searchTermChck = false;
    this.filterActivated = false;
    this.filteringItems = false;
    this.items = this.filterArray;
    console.log(this.filterArray);
  }

  async deleteItem(item) {
    const alert = await this.alert.create({
      header: 'Are you sure?',
      message: "You're going to delete this restaurant, <strong>this action can't be undone</strong>",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log("Cancel button");
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.filteringItems = false;
            const index2 = this.filterArray.findIndex(order => order.name === item.name);
            this.filterArray.splice(index2, 1);
            const index = this.items.findIndex(order => order.id === item.id);
            this.items.splice(index, 1);
            this.fire.removeArray();
            this.fire.removeARestaurant(item.id);
            this.toats.presentToast("Your restaurant has been deleted successfully", "success", 2000);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Help',
      message: "€ - Means that the price is between 15-30<br><br>€€ - Means that the price is between 30-45<br><br>€€€ - Means that the price is greater than 45",
      buttons: ['OK']
    });

    await alert.present();
  }

  helpModal() {
    this.presentAlert();
  }

  addItem() {
    console.log(this.email);
    this.router.navigate(['/add', { mail: JSON.stringify(this.email) }]);
    this.deleteResta = true;
  }

  goToLoginPage() {
    this.router.navigateByUrl('home');
  }
}
