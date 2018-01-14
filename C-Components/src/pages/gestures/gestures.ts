import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-gestures',
  templateUrl: 'gestures.html'
})
export class GesturesPage {

  constructor(public navCtrl: NavController) {
  }

  onClick() {
    console.log('Clicked or touched');
  }

  onTap() {
    console.log('Tapped');
  }

  onPress() {
    console.log('Pressed');
  }
}
