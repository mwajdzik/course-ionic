import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  locationSet = false;
  location: Location = {
    lat: 40.7624324,
    long: -73.9759827
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  onOpenMap() {
    const params = {location: this.location, isSet: this.locationSet};
    const modal = this.modalCtrl.create(SetLocationPage, params);
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.location = data.location;
        this.locationSet = true;
      }
    })
  }
}
