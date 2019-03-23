import {Component} from '@angular/core';
import {NavController, NavParams, reorderArray} from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items = ['Maciek', 'Madzia', 'Ewa'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  reorderItems(indexes) {
    this.items = reorderArray(this.items, indexes);
  }
}
