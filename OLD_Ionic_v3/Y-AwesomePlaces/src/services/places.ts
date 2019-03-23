import {Place} from "../models/place";
import {Location} from "../models/location";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import {File, RemoveResult} from "@ionic-native/file";
import {ToastController} from "ionic-angular";

declare var cordova: any;

@Injectable()
export class PlacesService {

  private places: Place[] = [];

  constructor(private toastCtrl: ToastController,
              private storage: Storage,
              private file: File) {
  }

  addPlace(title: string, description: string, location: Location, imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);

    return this.storage.set('places', this.places)
      .catch((err) => {
        this.deletePlace(this.places.indexOf(place));
        this.showMessage(err);
      });
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
    return this.storage.get('places')
      .then((places: Place[]) => {
        this.places = places || [];
        return this.loadPlaces();
      })
      .catch((err) => {
        this.places = [];
        this.showMessage(err);
      });
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);

    return this.storage.set('places', this.places)
      .then(() => {
        this.removeFile(place);
      })
      .catch((err) => {
        this.showMessage(err);
      });
  }

  private removeFile(place: Place) {
    const name = place.imagePath.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, name)
      .then((data: RemoveResult) => {
        this.showMessage('File removed: ' + data.success);
      })
      .catch((err) => {
        this.addPlace(place.title, place.description, place.location, place.imagePath);
        this.showMessage(err);
      });
  }

  showMessage(message: string) {
    this.toastCtrl.create({message, duration: 5000})
      .present();
  }
}
