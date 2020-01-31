import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastService } from '../services/toast.service';
import { FirestoreService } from '../services/firestore.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  mail: string = "";
  password: string = "";
  mensaje: string;
  constructor(private loadingController: LoadingController, private router: Router, private afAuth: AuthServiceService, private toast: ToastService, private fire: FirestoreService) { }

  ngOnInit() {
  }
  signIn() {
    this.router.navigateByUrl("login-mail");
  }
  signUp() {
    console.log(this.mail);
    this.afAuth.createUser(this.mail, this.password)
      .then(async () => {
        let user = {
          mail: this.mail
        };
        this.fire.getCollection(user.mail);
        setTimeout(() => {

          if (this.fire.getCollection(user.mail).length === 0) {
            this.fire.removeArray();
            this.router.navigateByUrl("no-items");
          } else {
            this.fire.removeArray();
            this.router.navigateByUrl("main");
          }
        }, 2000);
        const loading = await this.loadingController.create({
          message: 'Login in...',
          spinner: 'dots',
          duration: 2000
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        sessionStorage.setItem("userLoggedin", JSON.stringify(user));
        this.toast.presentToast("Your account has been created successfully", "success", 3000);
      }, error => {
        if (error.message.includes("account")) {
          this.mensaje = "This account is already in use";
        } else if (error.message.includes("user")) {
          this.mensaje = "The user doesn't exist, please try again";
        } else if (error.message.includes("password")) {
          this.mensaje = "Password incorrect, please try again";
        } else if (error.message.includes("email ")) {
          this.mensaje = "E-mail is badly formed";
        }
        this.toast.presentToast(this.mensaje, "danger", 3000);
      });
  }
}
