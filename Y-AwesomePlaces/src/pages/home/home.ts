import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {Place} from "../../models/place";
import {PlacesService} from "../../services/places";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  addPlacePage = AddPlacePage;

  places: Place[] = [];

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private placesService: PlacesService) {
  }

  ngOnInit() {
    this.placesService.fetchPlaces()
      .then((places: Place[]) => {
        this.places = places;
      });
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    this.modalCtrl.create(PlacePage, {place, index}).present();
  }
}
