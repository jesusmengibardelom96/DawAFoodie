import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';
import { AlertController } from '@ionic/angular';

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
  items: any = null;
  searchTermChck: boolean;
  filterArray: any[] = [];
  edited: boolean;
  restaurantEdited: any;
  priceRange: string;
  constructor(public alert: AlertController, private afAuth: AuthServiceService, private router: Router, private restaurants: RestaurantsService, private route: ActivatedRoute) {
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
    /*this.route.params.subscribe(params =>{
      this.edited = params['edited'];
    });*/


    /*
    if(this.restaurant.priceRange.includes("15-30")){
      this.priceRange = "€";
    }else if(this.restaurant.priceRange.includes("30-45")){
      this.priceRange = "€€";
    }else if(this.restaurant.priceRange.includes(">45")){
      this.priceRange = "€€€";
    }else{
      this.priceRange = "Undetermined";
    }
    */
  }

  ionViewDidEnter() {
    this.edited = undefined;
    this.newItems = [];
    this.user = JSON.parse(sessionStorage.getItem("userLoggedin"));
    if(JSON.parse(sessionStorage.getItem("itemEditado")) !== null){
      this.restaurantEdited = JSON.parse(sessionStorage.getItem("itemEditado"));
      this.edited = this.restaurantEdited.editado;
    }
    if (this.user !== null) {
      this.email = this.user.mail;
      this.items = this.restaurants.getData();
      for (let item of this.items) {
        if (this.user.mail === item.mail) {
          if (this.edited === true) {
            console.log("Editado = " + this.edited);
            let restaurantSession = {
              mail: this.restaurantEdited.mail,
              name: this.restaurantEdited.name,
              type: this.restaurantEdited.type,
              visited: this.restaurantEdited.visited,
              photo: this.restaurantEdited.photo,
              logo: this.restaurantEdited.logo,
              comment: this.restaurantEdited.comment,
              opinion: this.restaurantEdited.opinion,
              priceRange: this.restaurantEdited.priceRange,
              district: this.restaurantEdited.district
            }
            this.filterArray.push(restaurantSession);
            this.newItems.push(restaurantSession);
            sessionStorage.setItem("itemsEditados", JSON.stringify(this.newItems));
            this.edited = false;
            this.valueOfPriceRange(restaurantSession);
          } else if (this.edited === false) {
            console.log("Editado = " + this.edited);
            this.newItems = JSON.parse(sessionStorage.getItem("itemsEditados"));
            this.filterArray = JSON.parse(sessionStorage.getItem("itemsEditados"));
          } else {
            console.log("Editado = " + this.edited);
            this.newItems.push(item);
            this.filterArray = this.newItems;
            this.valueOfPriceRange(item);
          }
        }
      }
      this.nameButton = "Log out"
    } else {
      this.nameButton = "Log in";
    }
    
  }

  logOut() {
    sessionStorage.removeItem("userLoggedin");
    sessionStorage.removeItem("itemsEditados");
    sessionStorage.removeItem("itemsViejos");
    sessionStorage.removeItem("itemEditado");
    this.newItems = [];
    this.router.navigateByUrl("home");
    this.afAuth.signoutUser();
    this.afAuth.googleLogout();
    this.afAuth.facebookLogout();
  }

  logIn() {
    this.router.navigateByUrl("home");
  }

  hideOn() {
    this.hideObject = !this.hideObject;
    this.newItems = [];
    for (let item of this.filterArray) {
      if (this.user.mail === item.mail) {
        this.newItems.push(item);
        this.filterArray = this.newItems;
      }
    }
    console.log(this.newItems);
    this.searchTermChck = false;
    this.searchTerm = "";
  }

  filterItems(){
    let arrayTest = [];
    this.newItems = [];
    for (let i of this.filterArray) {
      if(i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited !== this.searchTermChck) arrayTest = [];
      if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase() && i.visited !== this.searchTermChck) >= 0) arrayTest = [];
      if (i.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);
      if (i.type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 && i.visited === this.searchTermChck) arrayTest.push(i);
    }
    this.newItems = arrayTest;
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
  valueOfPriceRange(object:any){
    if(object.priceRange.includes("15-30")){
      this.priceRange = "€";
    }else if(object.priceRange.includes("30-45")){
      this.priceRange = "€€";
    }else if(object.priceRange.includes(">45")){
      this.priceRange = "€€€";
    }
  }
  goToEdit(item) {
    this.edited = true;
    sessionStorage.setItem("itemsViejos", JSON.stringify(this.newItems));
    this.router.navigate(['/edit', { restaurant: JSON.stringify(item) }]);
    const index = this.filterArray.findIndex(order => order.name === item.name);
    this.filterArray.splice(index, 1);
    this.newItems.splice(index, 1);
    
  }

  resetItems(){
    this.searchTerm = "";
    this.searchTermChck = false;
    this.newItems = this.filterArray;
  }

  deleteItem(item){
    const index = this.filterArray.findIndex(order => order.name === item.name);
    const index2 = this.newItems.findIndex(order => order.name === item.name);
    this.filterArray.splice(index, 1);
    this.newItems.splice(index2, 1);
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
}
