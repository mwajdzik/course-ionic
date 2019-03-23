import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Location} from "../../models/location";

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  location: Location;
  marker: Location;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewController: ViewController) {
    this.location = this.navParams.get('location');
    if (this.navParams.get('isSet')) {
      this.marker = this.location;
    }
  }

  ionViewDidLoad() {
  }

  onSetMarker(event: any) {
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  onConfirm() {
    this.viewController.dismiss({location: this.marker});
  }

  onAbort() {
    this.viewController.dismiss();
  }
}
