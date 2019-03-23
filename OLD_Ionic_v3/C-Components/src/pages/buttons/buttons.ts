import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-buttons',
  templateUrl: 'buttons.html'
})
export class ButtonsPage {

  constructor(public navCtrl: NavController) {
  }

  onClick(event) {
    console.log(event);
  }
}
