import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: any = {
    mail: ""
  };
  newItems: any [] = [];
  email: string;
  nameButton:string = "";
  hideObject:boolean = true;
  searchTerm: string = "";
  items: any = null;
  searchTermChck:boolean = false;
  constructor(private afAuth: AuthServiceService, private router: Router, private restaurants: RestaurantsService) {
    this.email = "random user";
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("userLoggedin"));
    if(this.user !== null){
      this.email = this.user.mail;
    }else{
      this.user = {
        mail: "random user"
      };
    }
  }
  ionViewDidEnter(){
    this.user = JSON.parse(sessionStorage.getItem("userLoggedin"));
    if(this.user !== null){
      this.email = this.user.mail;
      this.items = this.restaurants.getData();
      for(let item of this.items){
        console.log("fuera del if " + item.mail);
        if(this.user.mail === item.mail){
          console.log("dentro del if " + item.mail);
          this.newItems.push(item);
        }
      }
      this.nameButton = "Log out"
    }else{
      this.nameButton = "Log in";
    }
  }
  logOut(){
    sessionStorage.removeItem("userLoggedin");
    this.newItems = [];
    this.router.navigateByUrl("home");
    this.afAuth.signoutUser();
    this.afAuth.googleLogout();
    this.afAuth.facebookLogout();
  }
  logIn(){
    this.router.navigateByUrl("home");
  }
  hideOn(){
    this.hideObject = !this.hideObject;
    this.newItems = [];
    for(let item of this.items){
      console.log("fuera del if " + item.mail);
      if(this.user.mail === item.mail){
        console.log("dentro del if " + item.mail);
        this.newItems.push(item);
      }
    }
  }
  setFilteredItems() {
    return this.newItems.filter(item2 => 
      {
        return item2.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0;
      },
      item2 => {
        return item2.type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0;
      });
  }
  setFilteredItems2() {
    console.log(this.searchTermChck);
    
      for(let item of this.items){
        console.log(item.visited);
        if(this.user.mail === item.mail && item.visited === this.searchTermChck){
          console.log(item);
          this.newItems.push(item);
        }else{
          this.newItems = [];
        }
      }
    
  }
  filteredArray(){
    this.newItems = this.setFilteredItems();
    if(this.searchTerm.trim() === "" && this.newItems.length === 0){
      for(let item of this.items){
        if(this.user.mail === item.mail){
          this.newItems.push(item);
        }
      }
    }
  }
}
