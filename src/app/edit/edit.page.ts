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
  newVisited: boolean = false;
  newComment: string = "";
  newOpinion: string = "";
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = JSON.parse(params['restaurant']);
    });
  }
  ionViewDidEnter() {
    if(this.restaurant.opinion.trim() === ""){
      this.restaurant.opinion = "Leave us here your opinion of this restaurant..."
    }
    if(this.restaurant.comment.trim() === ""){
      this.restaurant.comment = "Leave us here your commentary of this restaurant..."
    }
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
    if(this.restaurant.opinion.trim() === ""){
      this.restaurant.opinion = "";
      this.newOpinion = this.restaurant.opinion;
    }
    if(this.restaurant.comment.trim() === ""){
      this.restaurant.comment = "";
      this.newComment = this.restaurant.comment;
    }
    this.restaurantEdited = {
      mail: this.restaurant.mail,
      name: this.newName,
      type: this.newType,
      visited: this.newVisited,
      photo: "",
      logo: "",
      comment: this.newComment,
      opinion: this.newOpinion,
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
