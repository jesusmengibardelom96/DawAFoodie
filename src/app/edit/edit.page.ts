import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  restaurant: any;
  restaurantEdited: any;
  newName: string = "";
  newType: string = "";
  newPrice: string = "";
  newDistrict: string = "";
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = JSON.parse(params['restaurant']);
    });
  }
  ionViewDidEnter() {

  }
  sendToMain() {
    if (this.newName.trim() === "") {
      this.newName = this.restaurant.name;
    }
    if (this.newType.trim() === "") {
      this.newType = this.restaurant.type;
    }
    if (this.newPrice.trim() === "") {
      this.newPrice = this.restaurant.priceRange;
    }
    if (this.newDistrict.trim() === "") {
      this.newDistrict = this.restaurant.district;
    }
    this.restaurantEdited = {
      mail: this.restaurant.mail,
      name: this.newName,
      type: this.newType,
      visited: this.restaurant.visited,
      photo: "",
      logo: "",
      comment: "",
      opinion: "",
      priceRange: this.newPrice,
      district: this.newDistrict,
      editado: true
    }
    sessionStorage.setItem("itemEditado", JSON.stringify(this.restaurantEdited));
    this.newName = "";
    this.newType = "";
    this.newPrice = "";
    this.newDistrict = "";
    this.router.navigateByUrl("main");
  }

  noEdition() {
    this.router.navigateByUrl("main");
  }

}
