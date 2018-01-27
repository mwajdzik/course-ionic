import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import {Geolocation} from "@ionic-native/geolocation";

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
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation) {
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

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your location'
    });

    loader.present();

    this.geolocation.getCurrentPosition()
      .then(data => {
        loader.dismiss();
        this.location = new Location(data.coords.latitude, data.coords.longitude);
        this.locationSet = true;
      })
      .catch(error => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Could not get location, please pick it manually!',
          duration: 2500
        });

        toast.present();
      })
  }
}
