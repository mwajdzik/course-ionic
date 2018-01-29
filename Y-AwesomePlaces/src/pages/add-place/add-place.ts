import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import {Geolocation} from "@ionic-native/geolocation";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {PlacesService} from "../../services/places";
import {Entry, File, FileError} from "@ionic-native/file";

declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  initialLocation: Location = {
    lat: 40.7624324,
    long: -73.9759827
  };

  imageUrl = '';
  locationSet = false;
  location: Location = this.initialLocation;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private placesService: PlacesService,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File) {
  }

  ionViewDidLoad() {
  }

  onSubmit(form: NgForm) {
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl)

    form.reset();
    this.location = this.initialLocation;
    this.locationSet = false;
    this.imageUrl = ''
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
        this.showError('Could not get location, please pick it manually! ' + error);
      })
  }

  onTakePhoto() {
    this.camera.getPicture(this.options)
      .then((imageData) => {
        const name = imageData.replace(/^.*[\\\/]/, '');
        const path = imageData.replace(/[^\/]*$/, '');
        const newName = new Date().getUTCMilliseconds() + '.jpg';

        this.file.moveFile(path, name, cordova.file.dataDirectory, newName)
          .then((data: Entry) => {
            this.imageUrl = data.nativeURL;
            this.camera.cleanup();
          })
          .catch((err: FileError) => {
            this.showError(err.message);
            this.imageUrl = '';
            this.camera.cleanup();
          });
      }, (err) => {
        this.showError(err);
      });
  }

  showError(message: string) {
    this.toastCtrl.create({message, duration: 5000})
      .present();
  }
}
