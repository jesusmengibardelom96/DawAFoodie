import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { ToastService } from '../services/toast.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  name: string = "";
  type: string = "";
  price: string = "";
  district: string = "";
  visited: boolean = false;
  comment: string = "";
  opinion: string = "";
  email: string;
  placeHolderComment: string;
  placeHolderOpinion: string;
  constructor(private loadingController:LoadingController, private router: Router, private fire: FirestoreService, private route: ActivatedRoute, private toast: ToastService) { }

  ngOnInit() {
    this.placeHolderComment = "Place your comment here...";
    this.placeHolderOpinion = "Place your opinion here...";
    this.route.params.subscribe(params => {
      this.email = JSON.parse(params['mail']);
    });
    console.log(this.email);
  }
  async backMain() {
    this.fire.getCollection(this.email);
    setTimeout(() => {

      if (this.fire.getCollection(this.email).length === 0) {
        this.fire.removeArray();
        this.router.navigateByUrl("no-items");
      } else {
        this.fire.removeArray();
        this.router.navigateByUrl("main");
      }
    }, 2000);
    this.presentLoader();
  }
  sendToMain() {
    if (this.name.trim() === "" || this.type.trim() === "" || this.price.trim() === "" || this.district.trim() === "") {
      this.toast.presentToast("You can't save a restaurant that dont have name, type, price or district, please fill the fields and try again", "danger", 5000);
    } else {
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
      this.presentLoader();
      this.toast.presentToast("This restaurant has been successfully created ", "success", 2000);
      this.backMain();
    }
  }
  async presentLoader(){
    const loading = await this.loadingController.create({
      message: 'Loading Restaurants please wait...',
      spinner: 'dots',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
