import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  name:string;
  type:string;
  price:string;
  district:string;
  visited:boolean;
  comment:string;
  opinion:string;
  email:string;
  constructor(private router : Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = JSON.parse(params['mail']);
    });
  }
  sendToMain(){
    let item = {
      mail: this.email,
      name: this.name,
      type: this.type,
      priceRange: this.price,
      district: this.district,
      visited: this.visited,
      comment: this.comment,
      opinion: this.opinion,
      photo: "",
      logo: "",
      added: true
    }
    sessionStorage.setItem("ItemAdd", JSON.stringify(item));
    this.backMain();
  }
  backMain(){
    this.router.navigateByUrl("main");
  }
}
