import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastService } from '../services/toast.service';
import { FirestoreService } from '../services/firestore.service';
@Component({
  selector: 'app-login-mail',
  templateUrl: './login-mail.page.html',
  styleUrls: ['./login-mail.page.scss'],
})
export class LoginMailPage implements OnInit {
  mail: string = "";
  password: string = "";
  mensaje: string = "";
  constructor(public loadingController: LoadingController, private router: Router, private alertController: AlertController, private afAuth: AuthServiceService, private toast: ToastService, private fire: FirestoreService) { }

  ngOnInit() {
  }
  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Reset password',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Write your e-Mail here...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.afAuth.resetPasswd(data.email);
            this.toast.presentToast("An email has been sent, check ur spam inbox if you dont get it on principal inbox", "success", 5000);
          }
        }
      ]
    });

    await alert.present();
  }

  async signIn() {
    this.afAuth.loginUser(this.mail, this.password)
      .then(async () => {
        let user = {
          mail: this.mail,
        };
        const loading = await this.loadingController.create({
          message: 'Login in...',
          spinner: 'dots',
          duration: 2000
        });
        await loading.present();
        const { role, data } = await loading.onDidDismiss();
        sessionStorage.setItem("userLoggedin", JSON.stringify(user));
        this.toast.presentToast("SignIn successful", "success", 3000);
      }, error => {
        if (error.message.includes("email")) {
          this.mensaje = "E-mail is badly formed";
        } else if (error.message.includes("user")) {
          this.mensaje = "The user doesn't exist, please try again";
        } else if (error.message.includes("password")) {
          this.mensaje = "Password incorrect, please try again";
        }
        this.toast.presentToast(this.mensaje, "danger", 3000);
      });
  }
}
