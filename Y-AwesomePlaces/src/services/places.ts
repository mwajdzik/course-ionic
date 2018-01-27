import {Place} from "../models/place";
import {Location} from "../models/location";

export class PlacesServices {

  private places: Place[] = [];

  addPlace(title: string, description: string, location: Location, imageUrl: string) {
    this.places.push(new Place(title, description, location, imageUrl));
  }

  loadPlaces() {
    return this.places.slice();
  }
}
