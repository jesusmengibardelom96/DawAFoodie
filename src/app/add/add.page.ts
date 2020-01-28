import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  name:string= "";
  type:string= "";
  price:string= "";
  district:string = "";
  visited:boolean = false;
  comment: string = "";
  opinion: string = "";
  email: string;
  placeHolderComment:string;
  placeHolderOpinion:string;
  constructor(private router : Router, private fire: FirestoreService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.placeHolderComment = "Place your comment here...";
    this.placeHolderOpinion = "Place your opinion here...";
    this.route.params.subscribe(params => {
      this.email = JSON.parse(params['mail']);
    });
    console.log(this.email);
  }
  backMain(){
    this.router.navigateByUrl("main");
  }
  sendToMain(){
    let addingRestaurants = {
      id: this.fire.createId(),
      mail: this.email,
      name: this.name,
      type: this.type,
      priceRange: this.price,
      district: this.district,
      visited: this.visited,
      photo: "",
      logo: "",
      comment: this.comment,
      opinion: this.opinion
    };
    this.fire.createAnObject(addingRestaurants);
    this.backMain();
  }
}
