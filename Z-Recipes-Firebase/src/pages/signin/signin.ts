import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private authService: AuthService) {
  }

  ionViewDidLoad() {
  }

  onSignIn(form: NgForm) {
    const user = {
      email: form.value.email,
      password: form.value.password
    };

    const loading = this.loadingController.create({
      content: 'Signing you in...'
    });

    loading.present();

    this.authService.login(user)
      .then(result => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();

        const alert = this.alertController.create({
          title: 'Sign-in failed',
          message: error.message,
          buttons: ['OK']
        });

        alert.present();
      });
  }
}
