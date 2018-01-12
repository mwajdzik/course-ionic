import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {

  person: string;
  text: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewController: ViewController) {
  }

  ionViewDidLoad() {
    const quote = this.navParams.data;
    this.person = quote.person;
    this.text = quote.text;
  }

  onClose(remove = false) {
    this.viewController.dismiss(remove);
  }
}
