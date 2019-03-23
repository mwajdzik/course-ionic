import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private authService: AuthService) {
  }

  ionViewDidLoad() {
  }

  onSignUp(form: NgForm) {
    const user = {
      email: form.value.email,
      password: form.value.password
    };

    const loading = this.loadingController.create({
      content: 'Signing you up...'
    });

    loading.present();

    this.authService.registerUser(user)
      .then(result => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();

        const alert = this.alertController.create({
          title: 'Sign-up failed',
          message: error.message,
          buttons: ['OK']
        });

        alert.present();
      });
  }
}
