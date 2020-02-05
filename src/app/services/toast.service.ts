import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast:ToastController) { }

  async presentToast(mensaje:string, color:string, duration:number) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: duration,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
<<<<<<< HEAD
=======
  async presentToastCenter(mensaje:string, color:string, duration:number) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: duration,
      position: 'middle',
      color: color
    });
    toast.present();
  }
>>>>>>> ed21d1834f7aaeffd5cd47451c692ea32257b0f3
}
