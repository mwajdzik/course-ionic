import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserPage} from "./user/user";

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onLoadUser(name: string) {
    const params = {
      name: name
    };

    const opts = {
      duration: 2000,
      easing: 'ease-out',
      direction: 'forward'
    };

    this.navCtrl.push(UserPage, params, opts);
  }

  ionViewCanEnter(): boolean | Promise<boolean> {
    const canEnter = Math.random() > 0.5;
    console.log('1. ionViewCanEnter, can enter: ' + canEnter);
    return canEnter;
  }

  ionViewDidLoad() {
    console.log('2. ionViewDidLoad - not fired if cached');
  }

  ionViewWillEnter() {
    console.log('3. ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('4. ionViewDidEnter');
  }

  ionViewCanLeave() {
    console.log('5. ionViewCanLeave');
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
  }

  ionViewWillLeave() {
    console.log('6. ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('7. ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.log('8. ionViewWillUnload');
  }
}
