import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

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
  constructor(private route: ActivatedRoute, private router: Router, private fire : FirestoreService, private alert: AlertController, private toast: ToastService) { }

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
  async sendToMain() {

    if(this.newName.trim() === "" || this.newType.trim() === "" || this.newPrice.trim() === "" ||  this.newDistrict.trim() === "" ){
      const alert = await this.alert.create({
        header: 'Are you sure?',
        message: 'You gonna send a restaurant without complete all fields, we will fill it with the last data of the restaurant',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.toast.presentToast("The operation has been canceled", "primary", 2000);
            }
          }, {
            text: 'Ok',
            handler: () => {
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
                id: this.restaurant.id,
                mail: this.restaurant.mail,
                name: this.newName,
                type: this.newType,
                visited: this.newVisited,
                photo: "",
                logo: "",
                comment: this.newComment,
                opinion: this.newOpinion,
                priceRange: this.newPrice,
                district: this.newDistrict
              }
              this.fire.actualizarDatabase(this.restaurantEdited, this.restaurant);
              this.noEdition();
            }
          }
        ]
      });
      await alert.present();
    }
  }

  noEdition() {
    this.router.navigateByUrl("main");
  }

}
