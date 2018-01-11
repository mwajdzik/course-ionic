import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UsersPage} from "../users/users";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usersPage = UsersPage;

  constructor(public navCtrl: NavController) {
  }

  onGoToUsers() {
    this.navCtrl.push(UsersPage)
      .then((reason) => {
        if (!reason) {
          console.log('Access denied: ' + reason);
        }
      });
  }
}
