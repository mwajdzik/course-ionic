import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Quote} from "../../data/quote.interface";
import {QuotesService} from "../../services/quotes.service";
import {QuotePage} from "../quote/quote";

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  quotes: Quote[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalController: ModalController,
              private quotesService: QuotesService) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoritesQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalController.create(QuotePage, quote);
    modal.present();

    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.removeFromFavorites(quote);
      }
    });
  }

  onRemoveFromFavorites(quote: Quote) {
    this.removeFromFavorites(quote);
  }

  private removeFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorites(quote);
    this.ionViewWillEnter();
  }
}
